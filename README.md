# DMP Tool JKU - Johannes Kepler University Linz

This repository contains the source code for the DMP Tool JKU, developed by Laura Thaci. The tool leverages the principles of machine-actionable Data Management Plans (maDMPs) to streamline the creation and management of data management plans (DMPs) for research purposes.

## Overview

The DMP Tool JKU is designed to integrate seamlessly with Johannes Kepler University Linz's institutional systems, automating the collection of project details, research data, and personnel information. This integration minimizes repetitive data entry and enhances the accuracy and efficiency of DMP creation.

The tool produces DMPs that are both human-readable and editable in formats such as Word, and machine-actionable, aligning with the Science Europe’s Practical Guide to the International Alignment of Research Data Management and the RDA recommendations on maDMPs.

For more information about the base DAMAP implementation, visit the [DAMAP frontend repository](https://github.com/tuwien-csd/damap-frontend).

## DMP Tool JKU Frontend

This project is based on the DAMAP frontend developed in cooperation between TU Wien and TU Graz but has been adapted to meet the specific needs of Johannes Kepler University Linz. The project uses [Angular](https://angular.io/) as its framework and relies on [NX](https://nx.dev/) as a build system.

### Development Server

To run the development server:

```bash
nx serve damap-frontend
```

This will start the dev server, and the app will be accessible at `http://localhost:4200/`. Any changes made to the source files will trigger automatic reloading.

### Build

To build the project for production:

```bash
nx build damap-frontend
```

The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running Unit Tests

To run the unit tests:

- For the DAMAP library:

  ```bash
  nx test damap
  ```

- For the DMP Tool JKU frontend:

  ```bash
  nx test damap-frontend
  ```

### Running with Docker

To run the frontend and backend together in a dockerized setup, please refer to the [DMP Tool JKU backend repository](https://github.com/sharedRDM/damap-backend) for further instructions.

### Documentation

For more details, please refer to the [DMP Tool JKU Documentation](https://github.com/sharedRDM/dmp-jku-docs).

### Customisation

For customising the DMP Tool JKU frontend, please refer to the [CUSTOMISING](CUSTOMISING.md) page.

## Author

- Laura Thaci
- Mojib Wali

## Screenshots

![jku-bew](https://github.com/user-attachments/assets/855aa8ad-0525-4f72-8647-8ee666a7f433)
