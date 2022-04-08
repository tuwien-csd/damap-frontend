# Customisation

The damap-frontend is customized by forking this repository and adding graphic, 
and custom styling, as well as editing the translations to the contain the 
information necessary for your institution.
Thus adapting the configuration for your environment.

## Configuration 

The frontend only contains one config information, which is the address of the backend. 
There it will fetch the config information in file app.module.ts and config.service.ts.

For details on the backend project, refer to [damap-backend](https://github.com/tuwien-csd/damap-backend).

## What to change

In order to customize this project you will need to adapt some files.

* Logo: Provide your [logo](src/assets/logo.svg) as src/assets/logo.svg
* Theme: to customize the theme.* adapt the files 
  * [custom-theme.scss](src/themes/custom-theme.scss) and 
  * [custom-palettes.scss](src/themes/custom-palettes.scss) 
* [Translations](src/assets/i18n)

For more information on theming: 
https://material.angular.io/guide/theming & https://github.com/angular/components/blob/master/guides/theming.md

