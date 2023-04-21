---
title: '자바스크립트에서의 Void'
date: '2023-04-21 00:46:00'
category: 'javascript'
draft: true
---

이번 포스팅은 Javascript에서 `Void` 연산자에 대해서 다루어 보기로 했다.

## 갑자기 웬 Void?

이번에 새로 다니는 회사에서는 IDE를 webstorm을 쓰기 때문에 나도 덩달아 webstorm을 사용하게 되었다.
홍대의 모 회사를 다닐 때 이후로는 늘 vscode를 사용했으니 대략 3~4년만에 다시 사용해보는 IDE였다.

useEffect 내부에서 비동기 함수를 하나 실행시킬 일이 있었는데 해당 함수는 firebase의 FCM 토큰을 가져오는 함수로
useEffect 에서는 return이 `cleanup function`의 역할을 하기 때문에 

```javascript
useEffect(async () => {
  // ...
  await getFirebaseToken();
}, [])
// getFirebaseToken는 Promise를 반환 => 에러가 발생할 수 있다.
```
위와 같이 사용하면 Promise를 return 하게 되고, 에러가 발생할 수 있다.
그렇다고 아무 리턴값이 없는 get 함수를 변수에 할당할 필요성도 느끼지 못했고, `getFirebaseToken()`이라는 함수는 비동기적으로 실행된다고 해서
문제가 발생할 일이 없는 함수였기에 그냥 다음과 같이 사용했다.

```javascript
useEffect(() => {
  // ...
  getFirebaseToken();
}, []);
```

그런데 vscode에서는 아무런 위화감 없이 사용하던 부분이였는데 webstorm에서는 다음과 같은 warning이 발생했다.

![promise ignore warning](images/void/void-1.png)
> Promise returned from ${functionName} is ignored

요는 저 함수에서 반환된 프로미스가 무시되었다. 라는 내용인데....

알고있는 사실이기도 하지만 저렇게 warning을 남기니까 묘하게 기분이 좋지 않았다..

그래서 해당 warning을 제거하기 위해 구글링을 했는데 stackoverflow에 나와 같은 질문을 올린 [질문글 (출처: stackoverflow)](https://stackoverflow.com/questions/41278900/intellij-idea-warning-promise-returned-is-ignored-with-aysnc-await)을
보게 되었다.





참고할 것

https://m.blog.naver.com/skydoor2014/221141848372
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/void
https://webclub.tistory.com/242
https://stackoverflow.com/questions/41278900/intellij-idea-warning-promise-returned-is-ignored-with-aysnc-await
