// JavaScript for the Live Code Editor

document.addEventListener('DOMContentLoaded', () => {
  const htmlInput = document.getElementById('html-code');
  const cssInput = document.getElementById('css-code');
  const jsInput = document.getElementById('js-code');
  const previewFrame = document.getElementById('live-preview');
  const saveButton = document.getElementById('save-sketch');
  const downloadButton = document.getElementById('download-code');

  const updatePreview = () => {
    const html = htmlInput.value;
    const css = `<style>${cssInput.value}</style>`;
    const js = `<script>${jsInput.value}</script>`;
    
    const previewDoc = previewFrame.contentDocument;
    previewDoc.open();
    previewDoc.write(`${html}${css}${js}`);
    previewDoc.close();
  };

  const saveSketch = () => {
    const sketch = {
      html: htmlInput.value,
      css: cssInput.value,
      js: jsInput.value,
    };
    localStorage.setItem('savedSketch', JSON.stringify(sketch));
    alert('Sketch saved!');
  };

  const loadSketch = () => {
    const savedSketch = localStorage.getItem('savedSketch');
    if (savedSketch) {
      const { html, css, js } = JSON.parse(savedSketch);
      htmlInput.value = html;
      cssInput.value = css;
      jsInput.value = js;
      updatePreview();
    }
  };

  const downloadCode = () => {
    const code = `<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<title>Generated Page</title>\n<style>\n${cssInput.value}\n</style>\n</head>\n<body>\n${htmlInput.value}\n<script>\n${jsInput.value}\n</script>\n</body>\n</html>`;
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  htmlInput.addEventListener('input', updatePreview);
  cssInput.addEventListener('input', updatePreview);
  jsInput.addEventListener('input', updatePreview);

  saveButton.addEventListener('click', saveSketch);
  downloadButton.addEventListener('click', downloadCode);

  loadSketch(); // Load any previously saved sketches on page load
});