<a name="readme-top"></a>
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">

<h3 align="center">TypeScript Carousel</h3>

  <p align="center">
    Frontend test for MOL Group
    <br />
    <a href="https://github.com/matteo-minerva/ts-carousel"><strong>View Demo</strong></a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

![Carousel preview](./public/preview.png)

It is a fully functional carousel in typescript, which allows to:

- navigate using the arrows on the sides (to view the previous photo and the next photo)
- navigate via dots (to view the photo at the index clicked)
- run in autoplay mode (clicking on the bottom right button)

And also:

- navigation doesn't stop when reaching the 1st or last slide, but it starts over
- the transition between slides is animated

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![Vite][Vite]][Vite-url]
- [![TypeScript][TypeScript]][TypeScript-url]
- [![TailwindCSS][TailwindCSS]][TailwindCSS-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

To launch this project, you should have installed `Node.js`, `npm` and `yarn`.

- npm

  ```sh
  npm install npm@latest -g
  ```

- yarn (not required but recommended)
  ```sh
  npm install --global yarn
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/matteo-minerva/ts-carousel.git
   ```
2. Install packages via npm or yarn

   ```sh
   npm install
   ```

   or

   ```sh
   yarn
   ```

3. Build the project using the `build:npm` or `build:yarn` script depending on your favorite package manager

   ```sh
   npm run build:npm
   ```

   or

   ```sh
   yarn build:yarn
   ```

4. Run the project by running the `preview` script

   ```sh
   npm run preview
   ```

   or

   ```sh
   yarn preview
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Matteo Minerva - m.minerva@outlook.it

Project Link: [https://github.com/matteo-minerva/ts-carousel](https://github.com/matteo-minerva/ts-carousel)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/m-minerva
[Vite]: https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vitejs.dev/
[TypeScript]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[TailwindCSS]: https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white
[TailwindCSS-url]: https://tailwindcss.com/
