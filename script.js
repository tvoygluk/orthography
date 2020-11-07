function ready() {

    // эта функция получает наш результат проверки орфографии
    fix_spell = (data) => {
      data.forEach( (elem) => {
  
        // она находит наше поле ввода по имени
        document.getElementById('text_field').value = document.getElementById('text_field').value.replace(
            elem['word'],
            elem['s'][0] || elem['word']
          );
  
          // и меняет всё на правильные слова без ошибок
          
      });
    }
};

document.addEventListener("DOMContentLoaded", ready);

// обработчик нажатия на клавиши
document.addEventListener('keydown', (e) => {

// если нажат пробел или энтер
    if((e.keyCode == 32) || (e.keyCode == 13) ) {
        
        // делим текст на строки
        let lines = document.getElementById('text_field').value.replace(/\r\n|\n\r|\n|\r/g, "\n").split("\n");

        // и обрабатываем каждую строчку:
        lines.forEach( (line) => {
        if (line.length) {

            // отправляем строку со словами на проверку в Спеллер, результат сразу отправляется в функцию fix_spell
            //   $.getScript('http://speller.yandex.net/services/spellservice.json/checkText?text=' + line + '&callback=fix_spell');

            var js_script = document.createElement('script');
            js_script.type = "text/javascript";
            js_script.src = 'http://speller.yandex.net/services/spellservice.json/checkText?text=' + line + '&callback=fix_spell';
            js_script.async = true;
            document.getElementsByTagName('head')[0].appendChild(js_script);
            }
            setTimeout(() => js_script.remove(), 1000);
        });
    }

});
