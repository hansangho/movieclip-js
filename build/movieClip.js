/* update: 2013-11-08 11:21:30 AM */
;(function (global, $) {
	
    global.movieClip = function (options) {
    	if (!options.selector) return;

    	/**
		 * 무비클립 프레임 이동
		 * @param selector	= 배경 이미지가 있는 element
		 * @param frameRate	= 초당 보여질 프레임 수
		 * @param width		= 가로형 이미지일 경우 한프레임의 가로사이즈
		 * @param height	= 세로형 이미지일 경우 한프레임의 세로사이즈
		 * @param max		= 이미지의 프레임 수
		 */
        var config = extend({
            selector: '',
            frameRate: 30,
            width: '0px',
            height: '0px',
            max: 30
        }, options);

        config.frameRate = Math.floor(1000/config.frameRate);

        var This = this;
		var targetEl = $( config.selector );
		var enterFrame = null;
		var currentFrame = 1;
        
        // public function-------------------------------------------------
		/**
		 * Play()
		 * @param speed = 속도
		 * @param start = 시작 프레임
		 * @param end 	= 종료 프레임
		 * @param loop 	= 반복 (종료 프레임이 있을 경우 무시됩)
		 * @param callback 	= 프레임이 종료된후 실행될 콜백 함수
		 * @param callbackParam 	= 콜백함수의 파라메터 (콜백함수가 없을 경우 무시됩)
		 */
        This.play = function(opt){
			if(enterFrame != null) {
				This.stop();
			}

			var conf = extend({
	            speed: 1,
	            start: null,
	            end: null,
           		loop: false,
           		callback: null,
           		callbackParam: null
	        }, opt);

	        if ( conf.start != null ) currentFrame = conf.start;
			
			if(conf.end != null){
				if(currentFrame>conf.end && conf.speed>0) conf.speed = -1;
			}
	        frameMove();

			enterFrame = setInterval(function() {
				
				currentFrame = currentFrame + conf.speed;	
				
				if (conf.end != null) {
					if((conf.speed>0 && currentFrame >= conf.end)||(conf.speed<0 && currentFrame <= conf.end)){
						currentFrame = conf.end;
						stopFrame();
						if(conf.callback!=null) conf.callback(conf.callbackParam);
					}
				};
				
				if(conf.speed>0) {
					if(currentFrame >= config.max) {
						if(conf.loop) {
							if(currentFrame > config.max) currentFrame = 1;
						}else{
							currentFrame = config.max;
							stopFrame();
							if(conf.callback!=null) conf.callback(conf.callbackParam);
						}
					};
				}else if(conf.speed<0){
					if(currentFrame <= 1) {
						if(conf.loop) {
							if(currentFrame < 1) currentFrame = config.max;
						}else{
							currentFrame = 1;
							stopFrame();
							if(conf.callback!=null) conf.callback(conf.callbackParam);
						}
					};
				};

				frameMove();

			}, config.frameRate);
		}

		/**
		 * stop()
		 * @param end = 종료 프레임
		 */
		This.stop = function(opt){
			stopFrame();

			var conf = extend({end: currentFrame}, opt);
			currentFrame = conf.end;
			frameMove();
		}

        // private function-------------------------------------------------
		function frameMove() {
			var wp = config.width != '0px'? -((currentFrame-1)*config.width): config.width;
			var hp = config.height != '0px'? -((currentFrame-1)*config.height): config.height;

			targetEl.css({
				'background-position-x': wp,
				'background-position-y': hp
			});
		}
		
		function stopFrame() {
			if(enterFrame == null) return;
			clearInterval( enterFrame );
			enterFrame = null;
		}
    };

    // 옵션 재정의 
    function extend(dest, src) {
        for (var k in src) {
            if (src.hasOwnProperty(k)) {
                dest[k] = src[k];
            }
        }

        return dest;
    }

}(this, jQuery));
