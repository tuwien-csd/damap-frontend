import {IdentifierType} from '../domain/enum/person-id-type.enum';
import {Project} from '../domain/project';

export const mockProject: Project = {
  end: new Date(),
  funding: {
    funderId: {
      identifier: '501100004955', type: IdentifierType.FUNDREF
    }, fundingStatus: 'GRANTED',
    grantId: {
      identifier: '123456',
      type: null
    }, id: 79
  },
  id: 78,
  start: new Date(),
  title: 'Project title',
  universityId: 1234,
  description: '',
  dmpExists: false
};
