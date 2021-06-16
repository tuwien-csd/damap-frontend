import {LicenseDetails} from '../../domain/license-details';
import {ccPublicDomain} from './license-wizard-list';

export interface Step {
  readonly question?: string;
  readonly answers?: { [key: string]: { step: any, filter?: Filter } }
}

export interface Filter {
  readonly licenses?: LicenseDetails[];
  readonly include?: string[];
  readonly exclude?: string[];
}

const end: Step = {};
// Software

const strongCopyleft: Step = {
  question: 'Is your code used directly as an executable or are you licensing a library (your code will be linked)?',
  answers: {
    Executable: {
      step() {
        return end
      }, filter: {include: ['strong']}
    },
    Library: {
      step() {
        return end
      }, filter: {include: ['weak']}
    }
  }
}

const copyleft: Step = {
  question: 'Do you require others who modify your code to release it under a compatible licence?',
  answers: {
    Yes: {
      step(list) {
        if (has(list, 'weak') && has(list, 'strong')) {
          return strongCopyleft
        }
        return end
      }, filter: {include: ['copyleft']}
    },
    No: {
      step() {
        return end
      }, filter: {include: ['permissive'], exclude: ['copyleft']}
    }
  }
}

const licenseInteropSoftware: Step = {
  question: 'Select licenses in your code:',
  answers: {
    Next: {
      step(list: LicenseDetails[]) {
        if (has(list, 'copyleft') && has(list, 'permissive')) {
          return copyleft;
        } else if (has(list, 'copyleft') && has(list, 'strong') && has(list, 'weak')) {
          return strongCopyleft;
        }
        return end;
      }
    }
  }
}

const software: Step = {
  question: 'Is your code based on existing software or is it your original work?',
  answers: {
    'Based on existing software': {
      step() {
        return licenseInteropSoftware
      }
    },
    'My own code': {
      step() {
        return copyleft
      }
    }
  }
}

// Data

const decideAttributes: Step = {
  question: 'Do you want others to attribute your data to you?',
  answers: {
    Yes: {
      step() {
        return end
      }, filter: {include: ['by']}
    },
    No: {
      step() {
        return end
      }, filter: {include: ['public-domain']}
    }
  }
}

const commercialUse: Step = {
  question: 'Do you allow others to make commercial use of you data?',
  answers: {
    Yes: {
      step(list) {
        if (only(list, 'by')) {
          return end
        }
        return decideAttributes
      }, filter: {exclude: ['nc']}
    },
    No: {
      step() {
        return end
      }, filter: {include: ['nc', 'by']}
    }
  }
}

const shareAlike: Step = {
  question: 'Do you require others to share derivative works based on your data under a compatible license?',
  answers: {
    Yes: {
      step(list) {
        if (only(list, 'nc')) {
          return end
        }
        return commercialUse
      }, filter: {include: ['sa']}
    },
    No: {
      step(list) {
        if (only(list, 'nc')) {
          return end
        }
        return commercialUse
      }, filter: {exclude: ['sa']}
    }
  }
}

const allowDerivativeWorks: Step = {
  question: 'Do you allow others to make derivative works?',
  answers: {
    Yes: {
      step() {
        return shareAlike
      }, filter: {exclude: ['nd']}
    },
    No: {
      step(list) {
        if (only(list, 'nc')) {
          return end
        }
        return commercialUse
      }, filter: {include: ['nd']}
    }
  }
}

const licenseInteropData: Step = {
  question: 'Choose licenses present in your dataset:',
  answers: {
    Next: {
      step(list: LicenseDetails[], option: string) {
        if (option === 'cantLicense') {
          return cantLicense;
        } else if (option === 'end') {
          return end;
        }
        return allowDerivativeWorks;
      }
    }
  }
}

const cantLicense: Step = {
  question: 'You need additional permission before you can deposit the data!',
}

const ensureLicensing: Step = {
  question: 'Are all the elements of your dataset licensed under a public license or in the Public Domain?',
  answers: {
    Yes: {
      step() {
        return licenseInteropData
      }
    },
    No: {
      step() {
        return cantLicense
      }, filter: {licenses: []}
    }
  }
}

const ownIPR: Step = {
  question: 'Do you own copyright and similar rights in your dataset and all its constitutive parts?',
  answers: {
    Yes: {
      step() {
        return allowDerivativeWorks
      }
    },
    No: {
      step() {
        return ensureLicensing
      }
    }
  }
}

const data: Step = {
  question: 'Is your data within the scope of copyright and related rights?',
  answers: {
    Yes: {
      step() {
        return ownIPR
      }
    },
    No: {
      step() {
        return end
      }, filter: {licenses: [ccPublicDomain]}
    }
  }
}

const root: Step = {
  question: 'What do you want to deposit?',
  answers: {
    Software: {
      step() {
        return software
      }, filter: {exclude: ['data']}
    },
    Data: {
      step() {
        return data
      }, filter: {exclude: ['software']}
    }
  }
}

export const QUESTION_TREE = root;

function has(list: LicenseDetails[], category): boolean {
  return list.some(license => license.categories.includes(category));
}

function only(list: LicenseDetails[], category): boolean {
  return list.every(license => license.categories.includes(category));
}
