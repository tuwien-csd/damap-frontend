# Adaptation

## Configuration 

The frontend only contains one config information, which is the addresss of the backend. 
There it will fetch the config information in file app.module.ts and config.service.ts.

For details on the backend project, refer to [damap-backend]().

## Run the project with docker

For running the project in conjunction with the backend in a dockerized setup,
please refer to the [damap-backend]() project.

## Customization

In order to customize this project you will need to adapt some files.

* Logo: Provide your [logo](src/assets/logo.svg) as src/assets/logo.svg
* Theme: to customize the theme.* adapt the files 
  * [custom-theme.scss](src/themes/custom-theme.scss) and 
  * [custom-palettes.scss](src/themes/custom-palettes.scss) 
* [Translations](src/assets/i18n)

For more information on theming: 
https://material.angular.io/guide/theming & https://github.com/angular/components/blob/master/guides/theming.md

