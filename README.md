# LayoutPersonalization
오디오클립 홈 개인화 레이아웃

이 프로젝트는 NAVER CAMPUS HACKDAY Summer 2018에서 진행된 개인 작업물입니다.

<img src='http://drive.google.com/uc?export=view&id=1RHKazk7JidjlsDdEytg3obefyYyx90DX' /><br>

### 주제 선정 배경
* [오디오클립](https://audioclip.naver.com) 홈 화면의 정형화 된 레이아웃을 동적으로 변경 가능하도록 개선
* 콘텐츠 소비 및 사용 패턴에 맞는 개인화 된 레이아웃을 제공하여 서비스 사용성 개선

#### 요구사항
* (필수)오디오클립 홈 화면의 레이아웃의 순서를 변경 가능하도록 UI 개선
* (필수)변경 된 레이아웃의 정보는 서버에 저장하여 다양한 디바이스, 환경에서도 동기화하여 제공
* (선택)“구독 업데이트 클립”, “최근 들은 채널” 등 듣던 것을 계속 듣는 영역 또는 “오늘의 추천 채널”, “신규 채널” 등 새로운 것을 추천 하는 영역을 상위 노출하는 기본 레이아웃 템플릿을 제공
* (선택)홈 영역의 다양한 결과를 한 번에 가져오지 않고 개인화 된 레이아웃 중 화면에 보여줘야 할 영역에 대해 요청&응답을 받을 수 있는 구조로 개선 

### 구현 완료된 요구사항
* (핵심) 변경된 레이아웃 정보를 서버에 저장하여 로그인 시 해당 정보를 통해 렌더링
* (핵심) `Drag & Drop`기능을 지원하므로 각 요소를 이동 가능
* (선택) `Default Layout` 제공! 미 로그인 사용자의 경우 or 사용자가 편집 한 적이 없을 경우(요소가 0개인 경우)
* (선택) 오디오 클립의 6가지 요소 유형에 대한 데이터를 모두 가져오는 것이 아닌, 각 요소에 대해서만 `API Request`
* (추가) 오디오 클립 홈의 스타일 모방

### 내구 구조 

#### 렌더링
<img src='http://drive.google.com/uc?export=view&id=1gelL1D7g-ZUcYTAjb9fqCv-VLc_nM2Jp' /><br>

* 기본적으로 로그인이 되어있지 않은 상태에서는 `Default set`이 적용됩니다.


* 로그인 되어있지만 setting이 없거나, 편집을 통해 요소를 0개로 만든 경우에도 `Default set`이 적용됩니다. 


* 레이아웃 setting은 `json array`로 이루어져 있으며, [Develope Environment](https://github.com/NAVER-CAMPUS-HACKDAY/LayoutPersonalization/blob/Jun/Develope_Environment.md) 문서의 `Database`항목을 참고하세요. 


* setting이 존재할 경우에는 `for in`을 통해 `setting`의 데이터를 대상으로 반복문을 실행하게 됩니다.


* getInner 내부에서 호출되는 함수는 `daily()`, `aduio_book()`, `rookie_creater_channel()`, `audio_creater_channel()`, `clip_chart()`, `new_channel()`로 총 6개이며, 이는 오디오 클립 서비스에 존재하는 6가지 유형의 레이아웃을 각각 렌더링합니다.


* 각각의 함수가 `ajax`를 통해 `API`를 호출하도록 설계되어 있습니다. 단, 지금은 Hackday 프로젝트로 레이아웃 이상의 디테일은 구현하지 않았으므로 모든 함수가 동일한 `API`를 호출합니다.

#### 레이아웃 편집 및 저장
<img src='http://drive.google.com/uc?export=view&id=1KlnQ9Gowdt90w53wLQ9xOHSq8WHWy4r4' /><br>

* 편집 버튼을 누르면 `편집 상태`가 활성화됩니다. 각 요소의 순서 변경, 추가, 삭제를 지원합니다.

* 순서 변경은 `Drag&Drop`을 지원하며, 직관적인 수정이 가능합니다. 해당 기능은 자체 제작한 라이브러리를 사용했으며 [DragJS](https://github.com/miue22/DragJS)를 참고하세요.

* 추가는 화면의 최하단에 버튼이 등장하며, 모달에서 세부 옵션을 선택 후 `생성하기`를 클릭하면 화면에 렌더링됩니다. 이 때, `Drag&Drop`의 편의성을 위해 작은 크기의 임시 요소가 등장합니다.

* 삭제는 각 요소의 좌측 상단에 버튼이 등장하며, 클릭시 해당 요소가 완전히 삭제됩니다. 

* 완료 버튼을 `API`를 호출하여 변경된 사항을 서버에 저장하고, 콜백 함수에서 리렌더링하여 즉시 적용됩니다.


### 개발 환경
* Front-end : Javascript, JQuery
* Back-end : PHP
* Database : Mysql(MariaDB)
* Library : DragJS, Bootstrap, AnimateCSS
