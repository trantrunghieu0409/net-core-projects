angular.module(MODULE_NAME)
    .directive("ngDrag", ["$rootScope", "$location", "$window", "$document", "$parse", function($rootScope, $location, $window, $document, $parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var distX = 0, distY = 0, prevX = 0, prevY = 0;
            element.on('touchstart mousedown', dragstart);
            
            function dragstart(e) {
                console.log("drag start");
                e = e || $window.event;
                e.preventDefault();

                prevX = e.clientX;
                prevY = e.clientY;
                
                console.log(element.parent());
                
                
                element.on('touchmove mousemove', dragover); 
                element.on('touchend mouseup', dragend); 
            }
            console.log(element.prop('offsetLeft'));
            console.log(element.prop('offsetTop'));
           // let index = element.parent().find(element[0]);
           // console.log(index);

            function dragover(e) {
                console.log("dragging");
                e = e || $window.event;
                e.preventDefault();
                
                distX = e.clientX - prevX;
                distY = e.clientY - prevY;
                prevX = e.clientX;
                prevY = e.clientY;

                element.css('position', 'absolute');
                element.css('width', '100%');

                element.css('z-index', 10);
                element.css('cursor', 'move');
                element.css('left' , (element.prop('offsetLeft') + distX) + "px");
                element.css('top' , (element.prop('offsetTop')  + distY)+ "px");

                element.css('opacity', '0.8');

                $rootScope.$broadcast('dragover', ondragover());

                function ondragover() {
                    return {x: e.screenX, y: e.screenY};
                }
                
            }
            
            function dragend(e) {
                console.log("drag end");
                element.css('opacity', '1');

                //element.css('position', 'relative');
                $rootScope.$broadcast('dragend', ondragend());

                function ondragend() {
                    return element;
                }

                element.off('mousemove', dragover);
                element.off('mouseup', dragend);
            }
            var onDragSuccessCallback = $parse(attrs.ngDragSuccess) || null;
            var _data = $parse(attrs.ngDragData) || null;

            $rootScope.$on('success', function(e, mass) {
                if (element == mass) {
                    element.parent().parent()[0].removeChild(element.parent()[0]);

                    if (!onDragSuccessCallback )return;

                    scope.$apply(function () {
                        onDragSuccessCallback(scope, {$data: _data, $event: e});
                    });
                }
                
            });
            $rootScope.$on('fail', function(e, mass) {
                if (element == mass) {
                    element.css('position', '');
                    element.css('width', '');

                    element.css('z-index', '');
                    element.css('cursor', '');
                    element.css('left' , "");
                    element.css('top' , "");
                }
            });
        }    
    }
    }])
    .directive("ngDrop", ["$rootScope", "$location", "$window", "$document", function($rootScope, $location, $window, $document) {
        return {
            restrict: 'A',
            link: function(scope, element) {
                var el = element[0].getBoundingClientRect();
                let isInside = false;

                console.log(el.left, el.right, el.bottom, el.top);

                function insideElement(x, y) {
                    el = element[0].getBoundingClientRect();
                    return (x >= el.left && x <= el.right && y >= el.top && y <= el.bottom)
                }

                $rootScope.$on('dragover', ondragover);
                function ondragover(e, mass) {
                    isInside = insideElement(mass.x, mass.y);
                    if (isInside) {
                        element.removeClass('undrag');
                        element.addClass('dragover');
                    }
                    else {
                        element.removeClass('dragover');
                        element.addClass('undrag');
                    }
                }
                $rootScope.$on('dragend', function(e, mass) {
                    if (isInside) {
                        mass.css('left', "");
                        mass.css('top', "");
                        mass.css('z-index', "");
                        mass.css('position', 'relative');
                        
                        element[0].firstElementChild.appendChild(cloneElement(mass)[0]);
                        $rootScope.$broadcast('success', mass);

                        element.removeClass('dragover');
                        element.addClass('undrag');
                    } 
                    else {
                        $rootScope.$broadcast('fail', mass);
                    }
                });

                function cloneElement(ele) {
                    var cloneEle = ele.clone();
                    return cloneEle;
                }
            }
        }
        

    }])



