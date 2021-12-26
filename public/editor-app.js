var socket = io.connect('http://localhost:5000')

var htmlEditor = document.getElementById('html-editor')
var cssEditor = document.getElementById('css-editor')
var jsEditor = document.getElementById('js-editor')
var preview = document.getElementById('preview')

htmlEditor.addEventListener('keyup', () => {
  showPreview()
})

cssEditor.addEventListener('keyup', () => {
  showPreview()
})

jsEditor.addEventListener('keyup', () => {
  showPreview()
})

function showPreview() {
  var content = ""

  content += `<style>\n${cssEditor.innerText}\n<\/style>`
  content += `<script>\n${jsEditor.innerText}\n<\/script>`
  content += `<body>\n${htmlEditor.innerText}\n<\/body>`

  preview.src = `data:text/html; charset=UTF-8, <html>${content}</html>`
}

var stat = document.getElementById('status')
var btn = document.getElementById('upload')

btn.addEventListener('click', () => {
  /* var username = document.getElementById('user').value
  stat.innerHTML = `<em>${username || 'Anonymous'} recently updated...</em>` */

  socket.emit('update', {
    username: document.getElementById('username').value,
    htmlContent: htmlEditor.innerText,
    cssContent: cssEditor.innerText,
    jsContent: jsEditor.innerText
  })
})

socket.on('update', ({username ,htmlContent, cssContent, jsContent}) => {
  htmlEditor.innerText = htmlContent
  cssEditor.innerText = cssContent
  jsEditor.innerText = jsContent

  stat.innerHTML = `<em>${username || 'Anonymous'} recently updated...</em>`

  showPreview()
})