## 개발 환경 설정

### Database
#### 1. member table
<img src='http://drive.google.com/uc?export=view&id=1tzuVhQDqBtwTjol6b5agP3c5Dirawvid' /><br>

* 회원 정보 테이블입니다. 해커톤용 프로젝트이기 때문에 불필요한 디테일은 제외 하였습니다.
* `custom`은 개인 레이아웃 설정이 저장되는 column으로서, `JSON` 자료형입니다.
* 예시 

```[
    {
        "type" : "daily" //요일별 연재
        ...
    },    
    {
        "type" : "recommended" //추천 채널
        ...
    },
    {
        "type" : "new" //신규 채널
        ...
    },
    {
        "type" : "audio_book" //오디오 북
        ...
    },
    {
        "type" : "clip_chart" //클립 차트
        ...
    },
    {
        "type" : "creater" //오디오 크리에이터 채널
        ...
    }
]
```

### 2. clip_data table
<img src='http://drive.google.com/uc?export=view&id=1qpfWG3MDbU8zwf-P0jVm3n5b7qF4QNUO' /><br>
* 오디오 클립 데이터 테이블입니다. 관계자로부터 제공받은 dummy data가 삽입되어있습니다.

### API
#### 1. [GET]member_controller.php
##### Description
로그인 시 `member` 테이블에 저장되어 있는 해당 유저의 회원 정보 및 레이아웃 설정을 조회합니다.
##### Parameter
* `id` : 유저 id

##### Response
* `message` : 반환되는 `API Response`의 상태 정보.
* `data` : 유저의 정보. `no`, `id`, `pw`, `custom`


#### 2. [PUT]member_controller.php
##### Description
레이아웃 편집시 `member` 테이블의 특정 유저의 `custom` column 값을 수정합니다.

##### Parameter
* `id` : 유저 id
* `custom` : 레이아웃 정보

##### Response
* `message` : 반환되는 `API Response`의 상태 정보.

#### 3. [GET]clip_data_controller.php
##### Description
`clip_data` 테이블에 저장되어 있는 데이터를 조회합니다. 

원래는 각 요소에 해당하는 값을 가져오는 `API`가 각각 존재해야 하지만, 프로젝트 주제 이상의 디테일은 구현하지 않았기 때문에 518개의 정보 중 `start` 지점으로부터 `num`만큼 데이터를 가져와 렌더링할 수 있도록 합니다.
##### Parameter
* `start` : 테이블 row의 시작지점
* `num` : 시작지점으로부터 조회할 row의 개수

##### Response
* `message` : 반환되는 `API Response`의 상태 정보.
* `data` : 오디오 클립 데이터 셋. `JSON`으로 이루어진 데이터의 배열
