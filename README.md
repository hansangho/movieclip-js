## **MovieClip-js Project**

- `javascript` 키프레임 에니메이션 구현을 위한 **javascript 프로젝트** 입니다.
  
  
### **Sample page**
- [게임시작 sample page][samplepage1]
- [영상배너 sample page][samplepage2]
- [캐릭터 애니 sample page][samplepage4]
- [기능구현 sample page][samplepage3]

---
### **Usage**

#### **movieclip** Option
- **selector** : 애니메이션 이미지가 background로 지정되어 있는 element의 jQuery셀렉터 `String` `필수`
- **frameRate** : 초당 보여질 프레임 수 `Number` `필수`
- **width** : 가로형 이미지일 경우 한프레임의 가로사이즈 `Number` `선택` (whdth 또는 height 둘중 한개의 값 필수)
- **height** : 세로형 이미지일 경우 한프레임의 세로사이즈 `Number` `선택`
- **max** : 이미지의 총 프레임 수 `Number` `필수`

``` html
<script type="text/javascript" src="jquery_182_min.js"></script>
<script type="text/javascript" src="movieClip.js"></script>
<style type="text/css">
	#box {
		width: 220px;
		height: 140px;
		background:url('imgs/seqImg_001.gif') no-repeat 0 0;
	}
</style>

<div id="box"></div>

<script type="text/javascript">
	// movieClip 객체 생성
	var clip = new movieClip({
		selector: '#box',
		frameRate: 30,
		width: 0,
		height: 140,
		max: 97
	});
</script>
```

#### **play()** Option
- **speed** : 속도 - 음수값일 경우 역방향 플레이(ex:-2) `Number` `선택`
- **start** : 시작 프레임 `Number` `선택`
- **end** : 종료 프레임 (end값이 start보다 작을 경우 speed값을 음수로 지정해야 함) `Number` `선택`
- **loop** : 루프 애니 - 반복재생 `Boolean` `선택`
- **callback** : 프레임이 종료된후 실행될 콜백 함수 `Function` `선택`
- **callbackParam** : 콜백함수의 파라메터 `All` `선택`

``` javascript
clip.play(); // 기본
clip.play({end:30}); // 30프레임에서 멈춤
clip.play({speed:-3}); // 역방향 3의 속도
clip.play({loop:true});	// 무한 반복
clip.play({speed:2, loop:true}); // 2배 속도로 반복
clip.play({speed:-1, start:90, end:40, callback: callme, callbackParam:'btn5'}); // 90에서 40으로 역방향 재생후 콜백 함수 호출

function callme(param){
	console.log(param, 'call me call me');
}
```
#### **stop()** Option
- **end** : 종료 프레임 `Number` `선택`

``` javascript
clip.stop(); // 현재 프레임에서 정지
clip.stop({end:30}); // 30프레임으로 이동후 정지
```
 
  


[samplepage1]: http://legobbs.korea.ncsoft.corp/w/hsh/movieclip-js/gameStart.html
[samplepage2]: http://legobbs.korea.ncsoft.corp/w/hsh/movieclip-js/videoPreview.html
[samplepage3]: http://legobbs.korea.ncsoft.corp/w/hsh/movieclip-js/movieclip_sample.html
[samplepage4]: http://legobbs.korea.ncsoft.corp/w/hsh/movieclip-js/charactorControl.html

