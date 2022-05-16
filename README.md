[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=tuwien-csd_damap-frontend&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=tuwien-csd_damap-frontend)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=tuwien-csd_damap-frontend&metric=coverage)](https://sonarcloud.io/summary/new_code?id=tuwien-csd_damap-frontend)

# DAMAP

## Introduction

DAMAP is a tool that is currently being developed by TU Wien and TU Graz as part of the
[FAIR Data Austria](https://forschungsdaten.at/fda/) project.
It is based on the idea of machine actionable data management plans (maDMPs) and aims to facilitate the
creation of data management plans (DMPs) for researchers.
The tool aims to be closely integrated into the institutional environment, collecting information from
various established systems, in order to perceive project information, research data and personnel data
from existing systems.
This saves DMP authors from having to enter the same data several times.
Finally DAMAP delivers both a DMP that can be read and edited as a Word document, and an maDMP whose
information can be used at machine level. The current content of DAMAP is based on
[Science Europe’s Practical Guide to the International Alignment of Research Data Management](https://www.tuwien.at/fileadmin/Assets/forschung/Zentrum_Forschungsdatenmanagement/pdf-Sammlung/se_rdm_practical_guide_extended_final_2021.pdf)
and is compatible with the [RDA recommendation on machine actionable DMPs](https://zenodo.org/record/4036060#.Yk20vjWxVaR).

For a showcase of some of the tools functions see the [demo video](https://youtu.be/IxQzqy26ZO4).

## Damap Project and Documentation

For an overview and instructions for running the whole damap package (backend and frontend), 
refer to the [damap-backend](https://github.com/tuwien-csd/damap-backend) project.

## DamapFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.19.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Run the project with docker

For running the project in conjunction with the backend in a dockerized setup,
please refer to the [damap-backend](https://github.com/tuwien-csd/damap-backend) project.

###Customising

please refer to the [CUSTOMISING.md](CUSTOMISING.md) page.
