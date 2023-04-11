---
title: React StrictMode 렌더가 두번 되는 현상
date: 2023-04-12 00:59:69
category: trouble-shooting
thumbnail: { thumbnailSrc }
draft: false
---

<br>

### 무엇이 문제였나?

<br>

들어간 지 얼마 되지 않은 회사에서 기존 모바일웹페이지를 Push Notification이나 그 외 여러 Native 기능을 사용하고 싶어 Webview를 이용한 앱으로 배포하고 싶다며
React Native 웹뷰 포팅 개발 업무를 주었다.

웹뷰에서의 통신 테스트를 위해 로컬에서 간단하게 CRA로 웹뷰용 프로젝트를 하나 생성했고 React Native Webview 모듈을 사용하여 나의 로컬 ip를 웹뷰에 띄웠으나,
이상하게도 webview용 React 프로젝트의 useEffect 함수가 계속 2번 씩 도는 현상을 발견했다.

처음 앱이 실행될 때 Device의 Platform에 따라 window / document 에 addEventListener를 걸어 웹뷰용 프로젝트와 앱의 통신을 해야 했던지라
useEffect가 두번 돌면 불필요하게 이벤트 바인딩이 두번 일어나게 되는 일이 생겨 문제를 찾아보게 되었다.

<br>

### Trouble Shooting

<br>

처음에는 useEffect상의 콘솔이 두번 찍히길래 useEffect를 잘못 쓴 문제인가 싶어 보았으나 내가 사용한 문법에 문제는 없었다.

구글에 react useEffect twice 라고 검색을 하니 [다음과 같은 stack overflow 글](https://stackoverflow.com/questions/60618844/react-hooks-useeffect-is-called-twice-even-if-an-empty-array-is-used-as-an-ar)을 발견하게 되었고 답변 중 React.StrictMode가 켜져있는지 확인해보라는 글을 보게 되었다.

CRA를 통해 프로젝트를 자주 만들지 않았던 나로서는 React.StrictMode라는 태그를 처음 접하게 되었는데, develop mode 에서 의도적으로 앱을 2번 렌더하여 문제점을 찾아내는 것을 목적으로 한다는 것을 알게 되었다.

[해당 내용은 이 글을 참조했다.](https://stackoverflow.com/a/61897567)

<br>

### 마치며

<br>

아무래도 평소에 CRA로 프로젝트를 만드는 일이 많지 않다 보니 잘 모르던 태그가 나와 당황하게 되었는데 develop 단에서의 실수나 문제점을 찾아내기 위해 목적을 가지고 사용하면 나쁘지 않을 것 같다는 생각이 들었다.

Production 레벨에서는 아무 문제가 없다고 하니 큰 신경을 쓰지 않아도 되지만 새롭게 알게 된 점이어서 포스팅을 하게 되었다.