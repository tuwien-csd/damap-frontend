import {LicenseDetails} from '../../domain/license-details';

// Licenses
export const ccPublicDomain: LicenseDetails = {
  name: 'license.wizard.license.ccPublicDomain.name',
  priority: 1,
  available: true,
  url: 'https://creativecommons.org/publicdomain/mark/1.0/',
  description: 'license.wizard.license.ccPublicDomain.description',
  categories: ['public', 'data', 'software', 'public-domain'],
  labels: ['public', 'pd'],
  code: 'cc-public-domain',
  compatibility: ['cc-public-domain', 'mit', 'bsd-2c', 'bsd-3c', 'apache-2', 'lgpl-2.1', 'lgpl-2.1+', 'lgpl-3', 'mpl-2', 'epl-1', 'cddl-1', 'gpl-2', 'gpl-2+', 'gpl-3', 'agpl-1', 'agpl-3']
};
export const ccZero = {
  name: 'license.wizard.license.ccZero.name',
  priority: 1,
  available: true,
  url: 'https://creativecommons.org/publicdomain/zero/1.0/',
  description: 'license.wizard.license.ccZero.description',
  categories: ['public', 'data', 'public-domain'],
  labels: ['public', 'cc', 'zero', 'opendata'],
};
export const pddl = {
  name: 'license.wizard.license.pddl.name',
  priority: 1,
  available: false,
  url: 'https://opendatacommons.org/licenses/pddl/summary/',
  description: 'license.wizard.license.pddl.description',
  categories: ['public', 'data', 'public-domain'],
  labels: ['public']
};
export const ccBy = {
  name: 'license.wizard.license.ccBy.name',
  priority: 1,
  available: true,
  url: 'https://creativecommons.org/licenses/by/4.0/',
  description: 'license.wizard.license.ccBy.description',
  categories: ['public', 'data', 'by'],
  labels: ['public', 'cc', 'by', 'opendata']
};
export const odcBy = {
  name: 'license.wizard.license.odcBy.name',
  priority: 1,
  available: false,
  url: 'https://opendatacommons.org/licenses/by/summary/',
  description: 'license.wizard.license.odcBy.description',
  categories: ['public', 'data', 'by'],
  labels: ['public']
};
export const ccBySa = {
  name: 'license.wizard.license.ccBySa.name',
  priority: 1,
  available: true,
  url: 'https://creativecommons.org/licenses/by-sa/4.0/',
  description: 'license.wizard.license.ccBySa.description',
  categories: ['public', 'data', 'by', 'sa'],
  labels: ['public', 'cc', 'by', 'sa', 'opendata']
};
export const odbl = {
  name: 'license.wizard.license.odbl.name',
  priority: 1,
  available: false,
  url: 'https://opendatacommons.org/licenses/odbl/summary/',
  description: 'license.wizard.license.odbl.description',
  categories: ['public', 'data', 'by', 'sa'],
  labels: ['public']
};
export const ccByNd = {
  name: 'license.wizard.license.ccByNd.name',
  priority: 1,
  available: true,
  url: 'https://creativecommons.org/licenses/by-nd/4.0/',
  description: 'license.wizard.license.ccByNd.description',
  categories: ['public', 'data', 'by', 'nd'],
  labels: ['public', 'cc', 'nd']
};
export const ccByNc = {
  name: 'license.wizard.license.ccByNc.name',
  priority: 1,
  available: true,
  url: 'https://creativecommons.org/licenses/by-nc/4.0/',
  description: 'license.wizard.license.ccByNc.description',
  categories: ['public', 'data', 'by', 'nc'],
  labels: ['public', 'cc', 'nc']
};
export const ccByNcSa = {
  name: 'license.wizard.license.ccByNcSa.name',
  priority: 1,
  available: true,
  url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  description: 'license.wizard.license.ccByNcSa.description',
  categories: ['public', 'data', 'by', 'nc', 'sa'],
  labels: ['public', 'cc', 'by', 'nc', 'sa']
};
export const ccByNcNd = {
  name: 'license.wizard.license.ccByNcNd.name',
  priority: 1,
  available: true,
  url: 'https://creativecommons.org/licenses/by-nc-nd/4.0/',
  description: 'license.wizard.license.ccByNcNd.description',
  categories: ['public', 'data', 'by', 'nc', 'nd'],
  labels: ['public', 'cc', 'by', 'nc', 'nd']
};
export const perlArtistic1 = {
  name: 'license.wizard.license.perlArtistic1.name',
  priority: 7,
  available: true,
  url: 'https://opensource.org/licenses/Artistic-Perl-1.0',
  description: 'license.wizard.license.perlArtistic1.description',
  categories: ['public', 'software', 'perl'],
  labels: ['public', 'perl']
};
export const perlArtistic2 = {
  name: 'license.wizard.license.perlArtistic2.name',
  priority: 8,
  available: true,
  url: 'https://opensource.org/licenses/Artistic-2.0',
  description: 'license.wizard.license.perlArtistic2.description',
  categories: ['public', 'software', 'perl'],
  labels: ['public', 'perl', 'osi']
};
export const gpl2plus = {
  name: 'license.wizard.license.gpl2plus.name',
  priority: 10,
  available: true,
  url: 'https://opensource.org/licenses/GPL-2.0',
  description: 'license.wizard.license.gpl2plus.description',
  categories: ['public', 'software', 'gpl', 'copyleft', 'strong'],
  labels: ['public', 'gpl', 'copyleft'],
  code: 'gpl-2+',
  compatibility: ['gpl-2', 'gpl-2+', 'gpl-3', 'agpl-1', 'agpl-3']
};
export const gpl2 = {
  name: 'license.wizard.license.gpl2.name',
  priority: 10,
  available: false,
  url: 'https://opensource.org/licenses/GPL-2.0',
  description: 'license.wizard.license.gpl2.description',
  categories: ['public', 'software', 'gpl', 'copyleft', 'strong'],
  labels: ['public', 'gpl', 'copyleft'],
  code: 'gpl-2',
  compatibility: ['gpl-2', 'agpl-1']
};
export const gpl3 = {
  name: 'license.wizard.license.gpl3.name',
  priority: 11,
  available: true,
  url: 'https://opensource.org/licenses/GPL-3.0',
  description: 'license.wizard.license.gpl3.description',
  categories: ['public', 'software', 'gpl', 'copyleft', 'strong'],
  labels: ['public', 'gpl3', 'copyleft'],
  code: 'gpl-3',
  compatibility: ['gpl-2+', 'gpl-3', 'agpl-3']
};
export const agpl1 = {
  name: 'license.wizard.license.agpl1.name',
  priority: 50,
  available: false,
  url: 'http://www.affero.org/oagpl.html',
  description: 'license.wizard.license.agpl1.description',
  categories: ['public', 'software', 'agpl', 'copyleft', 'strong'],
  labels: ['public', 'copyleft'],
  code: 'agpl-1',
  compatibility: ['agpl-1']
};
export const agpl3 = {
  name: 'license.wizard.license.agpl3.name',
  priority: 51,
  available: true,
  url: 'https://opensource.org/licenses/AGPL-3.0',
  description: 'license.wizard.license.agpl3.description',
  categories: ['public', 'software', 'agpl', 'copyleft', 'strong'],
  labels: ['public', 'agpl3', 'copyleft'],
  code: 'agpl-3',
  compatibility: ['agpl-3']
};
export const mpl2 = {
  name: 'license.wizard.license.mpl2.name',
  priority: 1,
  available: true,
  url: 'https://opensource.org/licenses/MPL-2.0',
  description: 'license.wizard.license.mpl2.description',
  categories: ['public', 'software', 'copyleft', 'weak'],
  labels: ['public', 'mozilla', 'copyleft'],
  code: 'mpl-2',
  compatibility: ['lgpl-2.1', 'lgpl-2.1+', 'lgpl-3', 'mpl-2', 'gpl-2', 'gpl-2+', 'gpl-3', 'agpl-1', 'agpl-3']
};
export const lgpl21plus = {
  name: 'license.wizard.license.lgpl21plus.name',
  priority: 2,
  available: true,
  url: 'https://opensource.org/licenses/LGPL-2.1',
  description: 'license.wizard.license.lgpl21plus.description',
  categories: ['public', 'software', 'copyleft', 'weak'],
  labels: ['public', 'lgpl', 'copyleft'],
  code: 'lgpl-2.1+',
  compatibility: ['lgpl-2.1+', 'lgpl-3', 'mpl-2', 'gpl-2', 'gpl-2+', 'gpl-3', 'agpl-1', 'agpl-3']
};
export const lgpl21 = {
  name: 'license.wizard.license.lgpl21.name',
  priority: 2,
  available: false,
  url: 'https://opensource.org/licenses/LGPL-2.1',
  description: 'license.wizard.license.lgpl21.description',
  categories: ['public', 'software', 'copyleft', 'weak'],
  labels: ['public', 'lgpl', 'copyleft'],
  code: 'lgpl-2.1',
  compatibility: ['lgpl-2.1', 'mpl-2', 'gpl-2', 'agpl-1']
};
export const lgpl3 = {
  name: 'license.wizard.license.lgpl3.name',
  priority: 3,
  available: true,
  url: 'https://opensource.org/licenses/LGPL-3.0',
  description: 'license.wizard.license.lgpl3.description',
  categories: ['public', 'software', 'copyleft', 'weak'],
  labels: ['public', 'lgpl3', 'copyleft'],
  code: 'lgpl-3',
  compatibility: ['lgpl-3', 'mpl-2', 'gpl-3', 'agpl-3']
};
export const epl1 = {
  name: 'license.wizard.license.epl1.name',
  priority: 4,
  available: true,
  url: 'https://opensource.org/licenses/EPL-1.0',
  description: 'license.wizard.license.epl1.description',
  categories: ['public', 'software', 'copyleft', 'weak'],
  labels: ['public', 'eclipse', 'copyleft'],
  code: 'epl-1',
  compatibility: ['mpl-2', 'epl-1', 'cddl-1', 'gpl-3', 'agpl-3']
};
export const cddl1 = {
  name: 'license.wizard.license.cddl1.name',
  priority: 5,
  available: true,
  url: 'https://opensource.org/licenses/CDDL-1.0',
  description: 'license.wizard.license.cddl1.description',
  categories: ['public', 'software', 'copyleft', 'weak'],
  labels: ['public', 'copyleft', 'osi'],
  code: 'cddl-1',
  compatibility: ['cddl-1']
};
export const mit = {
  name: 'license.wizard.license.mit.name',
  priority: 1,
  available: true,
  url: 'https://opensource.org/licenses/mit-license.php',
  description: 'license.wizard.license.mit.description',
  categories: ['public', 'software', 'permissive'],
  labels: ['public', 'mit', 'osi'],
  code: 'mit',
  compatibility: ['mit', 'bsd-2c', 'bsd-3c', 'apache-2', 'lgpl-2.1', 'lgpl-2.1+', 'lgpl-3', 'mpl-2', 'epl-1', 'cddl-1', 'gpl-2', 'gpl-2+', 'gpl-3', 'agpl-1', 'agpl-3']
};
export const bsd3c = {
  name: 'license.wizard.license.bsd3c.name',
  priority: 2,
  available: true,
  url: 'https://opensource.org/licenses/BSD-3-Clause',
  description: 'license.wizard.license.bsd3c.description',
  categories: ['public', 'software', 'permissive'],
  labels: ['public', 'bsd', 'osi'],
  code: 'bsd-3c',
  compatibility: ['bsd-3c', 'apache-2', 'lgpl-2.1', 'lgpl-2.1+', 'lgpl-3', 'mpl-2', 'epl-1', 'cddl-1', 'gpl-2', 'gpl-2+', 'gpl-3', 'agpl-1', 'agpl-3']
};
export const bsd2c = {
  name: 'license.wizard.license.bsd2c.name',
  priority: 3,
  available: true,
  url: 'https://opensource.org/licenses/BSD-2-Clause',
  description: 'license.wizard.license.bsd2c.description',
  categories: ['public', 'software', 'permissive'],
  labels: ['public', 'bsd', 'osi'],
  code: 'bsd-2c',
  compatibility: ['bsd-2c', 'bsd-3c', 'apache-2', 'lgpl-2.1', 'lgpl-2.1+', 'lgpl-3', 'mpl-2', 'epl-1', 'cddl-1', 'gpl-2', 'gpl-2+', 'gpl-3', 'agpl-1', 'agpl-3']
};
export const apache2 = {
  name: 'license.wizard.license.apache2.name',
  priority: 4,
  available: true,
  url: 'https://www.apache.org/licenses/LICENSE-2.0',
  description: 'license.wizard.license.apache2.description',
  categories: ['public', 'software', 'permissive'],
  labels: ['public', 'apache', 'osi'],
  code: 'apache-2',
  compatibility: ['apache-2', 'lgpl-3', 'mpl-2', 'epl-1', 'gpl-3', 'agpl-3']
};

export const LicenseDefinitions: LicenseDetails[] = [ccPublicDomain, ccZero, pddl, ccBy, odcBy,
  ccBySa, odbl, ccByNd, ccByNc, ccByNcSa, ccByNcNd, perlArtistic1, perlArtistic2,
  gpl2plus, gpl2, gpl3, agpl1, agpl3, mpl2, lgpl21plus, lgpl21, lgpl3, epl1, cddl1,
  mit, bsd3c, bsd2c, apache2];

export const SoftwareLicenses: LicenseDetails[] = [
  ccPublicDomain, mit, bsd2c, bsd3c, apache2, lgpl21, lgpl21plus, lgpl3, mpl2, epl1, cddl1,
  gpl2, gpl2plus, gpl3, agpl1, agpl3
];

export const DataLicenses = [
  [ccPublicDomain, ccZero, pddl], [ccBy, odcBy], [ccByNc], [ccByNcSa], [odbl], [ccBySa], [ccByNd, ccByNcNd]
]
