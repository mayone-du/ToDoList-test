// メインJSの読み込み
(() => {


  // DOM要素
  const $doc = document;
  const $clear = $doc.getElementById("js-clear");
  const $date = $doc.getElementById("js-date");
  const $list = $doc.getElementById('js-ul');
  const $input = $doc.getElementById('js-input');
  const $addBtn = $doc.getElementById('js-addToDo');
  let LIST = [], id = 0;


  // クラスの格納
  const CHECK = "fa-check-circle";
  const UNCHECK = "fa-circle-thin";
  const LINE_THROUGH = "lineThrough";
  
  // 時間の取得
  const options = {year: "numeric", month: "2-digit", day: "2-digit", weekday: "short"};
  const today = new Date();
  $date.innerHTML = today.toLocaleDateString("ja-JP", options);


  // ToDoリストの追加
  function addToDo(toDo, id, done, trash) {

    if(trash) { return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `
    <li class="item">
      <i class="fa ${DONE}" data-complete="0" id="${id}"></i>
        <p class="text ${LINE}">${toDo}</p>
      <i class="fa fa-trash-o" data-delete="0" id="${id}"></i>
    </li>
    `;
    const position = "beforeend";
    $list.insertAdjacentHTML(position, item);
  }



  // エンターキーを押したときのアクション
  document.addEventListener("keyup", function(e) {
    
    if(e.keyCode == 13) {

      const $toDo = $input.value;
      if($toDo) {
        addToDo($toDo, id, false, false);

        LIST.push({
          name: $toDo,
          id: id,
          done: false,
          trash: false,
        });
        id++;
      }
      $input.value = "";
    }

  });


  // 完了ボタンのクリックイベント
  function completeToDo($element) {
    $element.classList.toggle(CHECK);
    $element.classList.toggle(UNCHECK);
    $element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH);
  }

  function removeToDo($element) {
    $element.parentNode.parentNode.removeChild($element.parentNode);
    LIST[$element.id].trash = true;
  }

  $list.addEventListener("click", function(e) {
    const $element = e.target;
    const $elementComplete = $element.dataset.complete;
    const $elementDelete = $element.dataset.delete;
    if($elementComplete == '0') {
      completeToDo($element);
    } else if($elementDelete == '0') {
      const result = confirm("このリストを削除しますか？");
      if(result) {
        removeToDo($element);
      }
    };

  })

  
  // +ボタンのクリックイベント
  $addBtn.addEventListener('click', function(e) {
    const $toDo = $input.value;
    if($toDo) {
      addToDo($toDo, id, false, false);

      LIST.push({
        name: $toDo,
        id: id,
        done: false,
        trash: false,
      });
      id++;
    }
    $input.value = "";
  });



})();