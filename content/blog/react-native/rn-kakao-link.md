---
title: 개츠비 구글 애널리틱스 플러그인 GA4 이슈 해결
date: 2023-04-15 02:13:69
category: react-native
thumbnail: { thumbnailSrc }
draft: false
---

이번 포스팅은 블로그가 Google Analytics(이하 GA)에 측정되지 않아 삽질을 하며 트러블슈팅하는 과정을 정리했다.

![google analytics image](./images/ga.png)

<br>

블로그 꽃단장에 재미가 들려 이것저것 설정하고 포스팅도 했는데 구글에 검색해도 노출이 되지 않는 듯 하여 서치콘솔 등의 작업을 하기 전 GA를 통해 추적을 확인해보기로 하였다. 한재엽 님의 [Gatsby-starter-bee](https://github.com/JaeYeopHan/gatsby-starter-bee) 스타터에서 gatsby-plugin-google-analytics이 잘 설정되어 있었으나 한 가지 문제가 있었다.
<br>
2020년 10월 14일 경 구글 애널리틱스가 4버전으로 업데이트가 되면서 기존 GA trackingID(추적ID) 대신 measurementID(측정ID) 라는 것으로 바뀌게 되어 개츠비 플러그인이 작동을 하지 않았던 것이다..!

<br>

![angry image](./images/very_angry.jpg)
> 이게 뭐야 왜 내가 할때만 이래 나만 운없어

<br>

### Trouble Shooting

처음에는 react-helmet을 사용하여 header에 바뀐 스크립트와 measurementID를 직접 넣어주려고 했다. 그러나 무엇때문인지 gtag 스크립트의 dataLayer 변수가 is not defined 하다는 에러가 떴다. 아마 ga script 요청의 비동기 문제 같았는데 async로 바꾸어 보아도 빌드단계에서의 에러는 어찌 해결이 안되어서 다른 방법을 찾기로 했다.
구글에 검색도 해보고 gatsby-plugin-google-analytics나 gatsby의 깃헙 이슈도 뒤져보던 중 [다음과 같은 이슈 링크](https://github.com/gatsbyjs/gatsby/issues/27627)를 발견했다.

<br>

이슈는 내가 겪고있는 것과 동일하게 구글 애널리틱스의 새로운 버전이 동작하지 않는다, trackingID 대신 measurementID가 있을 경우 어떻게 해야하나 라는 내용이었고 누군가가 친절하게도 답변을 달아주었다. 해결방법은 gatsby-plugin-google-analytics 대신 [gatsby-plugin-gtag](https://www.gatsbyjs.com/plugins/gatsby-plugin-gtag/)를 사용하라는 것! gatsby-plugin-google-analytics와 똑같은 동작을 하지만 deprecated된 analytics.js 대신 gtag.js를 사용하는 플러그인이라고 한다.
trackingID부분에 measurementID를 넣어주고 블로그를 업데이트 한 뒤 애널리틱스를 다시 확인해보았다.

<br>

![my blog ga image](./images/blog_analytics.png)
> 정상적으로 트래킹이 되기 시작하는 구글 애널리틱스

<br>

![so cool image](./images/so_cool.jpg)

<br>

### 마치며

어쩌다보니 블로그에 작성하는 첫 TrobuleShooting 포스팅이 되었다.
<br>
<br>
처음엔 정상적으로 헤더에 GA 스크립트와 내 ID 키값이 붙어있음에도 애널리틱스에서 추적이 되지 않아 의아하던 차에 2020년 10월 경 GA가 version 4로 업데이트 되었다는 점, 그로 인해 gatsby의 GA 플러그인이 호환되지 않았다는 점을 검색을 통해 찾아내고, 플러그인과 gatsby의 Github Issue 페이지를 뒤지며 해결 방법을 찾아낼 수 있었다.