
import { title } from 'process';

<style src="./styles/main.css"></style>

<script>
export default {
  name: 'App',
  data() {
    return {
      TITLE: {
        title: 'Vulnerabilities in Web Applications',
        subtitle: 'd',
      },
      MISC: {
        author: 'Jan Zbořil',
        year: '2023',
        school: 'Brno University of Technology \n Faculty of Information Technology',
      }
    }
  }
}
</script>

<template id="app">
  <!DOCTYPE html>
  <html lang="en" class="html">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title> {{ TITLE.title }} | {{ TITLE }} </title>
          <link rel="stylesheet" href="/styles/main.css">
          <link rel="icon" type="image/x-icon" href="../public/favicon.ico">
      </head>
      <body class="body">
          <div class="page-wrapper">
              <header class="title">
                  <h1 class='title-text'> {{ TITLE.title }} </h1>
                  <img class='title-logo' src='../public/VUT-FIT-logo.png'  alt="FIT">
                  <!-- <img src="/images/VUT-FIT-logo.png"   alt="FIT"> -->
              </header>
              <nav>
                  <ul class='topnav'>
                      <li><a class="active"  href="/">Home</a></li>
                      <li><a href="/xss">XSS</a></li>
                      <li><a href="/about">About</a></li>
                  </ul>
              </nav>
              <main>
                  <h1>Home!</h1>
                  <p> {{ TITLE }} </p>
                  <img src="/images/horner.png"   alt="Horner"  width="100%">
              </main>
              <footer class="footer">
                  <hr> 
                  <p>   
                      {{ MISC.author }} © {{ MISC.year }} <br>
                      {{ MISC.school }}
                  </p>
              </footer>
          </div>
      </body>
  </html>
</template>