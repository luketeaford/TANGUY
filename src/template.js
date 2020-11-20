module.exports = ({ html, metadata }) => `<!DOCTYPE html>
<html lang='en-us'>
<title>${metadata.title}</title>
${html}
<footer>Copyright © 2014–${new Date().getFullYear()} Luke Teaford. Made in the USA.</footer>
`
