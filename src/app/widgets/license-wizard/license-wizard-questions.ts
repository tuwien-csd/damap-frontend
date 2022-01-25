import {LicenseDetails} from '../../domain/license-details';
import {ccPublicDomain} from './license-wizard-list';

export interface Step {
  readonly question?: string;
  readonly answers?: { [key: string]: { step: any, filter?: Filter } } // set step type as (...[]) => {}
}

export interface Filter {
  readonly licenses?: LicenseDetails[];
  readonly include?: string[];
  readonly exclude?: string[];
}

const end: Step = {};
// Software

const strongCopyleft: Step = {
  question: 'license.wizard.question.strongCopyleft',
  answers: {
    'license.wizard.answer.executable': {
      step() {
        return end
      }, filter: {include: ['strong']}
    },
    'license.wizard.answer.library': {
      step() {
        return end
      }, filter: {include: ['weak']}
    }
  }
}

const copyleft: Step = {
  question: 'license.wizard.question.copyleft',
  answers: {
    yes: {
      step(list) {
        if (has(list, 'weak') && has(list, 'strong')) {
          return strongCopyleft
        }
        return end
      }, filter: {include: ['copyleft']}
    },
    no: {
      step() {
        return end
      }, filter: {include: ['permissive'], exclude: ['copyleft']}
    }
  }
}

const licenseInteropSoftware: Step = {
  question: 'license.wizard.question.licenseInteropSoftware',
  answers: {
    'license.wizard.answer.next': {
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
  question: 'license.wizard.question.software',
  answers: {
    'license.wizard.answer.licenseInteropSoftware': {
      step() {
        return licenseInteropSoftware
      }
    },
    'license.wizard.answer.copyleft': {
      step() {
        return copyleft
      }
    }
  }
}

// Data

const decideAttributes: Step = {
  question: 'license.wizard.question.decideAttributes',
  answers: {
    yes: {
      step() {
        return end
      }, filter: {include: ['by']}
    },
    no: {
      step() {
        return end
      }, filter: {include: ['public-domain']}
    }
  }
}

const commercialUse: Step = {
  question: 'license.wizard.question.commercialUse',
  answers: {
    yes: {
      step(list) {
        if (only(list, 'by')) {
          return end
        }
        return decideAttributes
      }, filter: {exclude: ['nc']}
    },
    no: {
      step() {
        return end
      }, filter: {include: ['nc', 'by']}
    }
  }
}

const shareAlike: Step = {
  question: 'license.wizard.question.shareAlike',
  answers: {
    yes: {
      step(list) {
        if (only(list, 'nc')) {
          return end
        }
        return commercialUse
      }, filter: {include: ['sa']}
    },
    no: {
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
  question: 'license.wizard.question.allowDerivativeWorks',
  answers: {
    yes: {
      step() {
        return shareAlike
      }, filter: {exclude: ['nd']}
    },
    no: {
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
  question: 'license.wizard.question.licenseInteropData',
  answers: {
    'license.wizard.answer.next': {
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
  question: 'license.wizard.question.cantLicense',
}

const ensureLicensing: Step = {
  question: 'license.wizard.question.ensureLicensing',
  answers: {
    yes: {
      step() {
        return licenseInteropData
      }
    },
    no: {
      step() {
        return cantLicense
      }, filter: {licenses: []}
    }
  }
}

const ownIPR: Step = {
  question: 'Do you own copyright and similar rights in your dataset and all its constitutive parts?',
  answers: {
    yes: {
      step() {
        return allowDerivativeWorks
      }
    },
    no: {
      step() {
        return ensureLicensing
      }
    }
  }
}

const data: Step = {
  question: 'license.wizard.question.data',
  answers: {
    yes: {
      step() {
        return ownIPR
      }
    },
    no: {
      step() {
        return end
      }, filter: {licenses: [ccPublicDomain]}
    }
  }
}

const root: Step = {
  question: 'license.wizard.question.root',
  answers: {
    'license.wizard.answer.software': {
      step() {
        return software
      }, filter: {exclude: ['data']}
    },
    'license.wizard.answer.data': {
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
