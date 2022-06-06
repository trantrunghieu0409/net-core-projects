angular.module(MODULE_NAME)
    .directive("ngDrag", ["$rootScope", "$location", "$window", "$document", function($rootScope, $location, $window, $document) {
    return {
        restrict: 'A',
        link: function(scope, element) {
            var distX = 0, distY = 0, prevX = 0, prevY = 0;
            element.on('mousedown', dragstart);

            function dragstart(e) {
                console.log("drag start");
                e = e || $window.event;
                e.preventDefault();

                prevX = e.clientX;
                prevY = e.clientY;

                element.on('mousemove', dragover); 
                element.on('mouseup', dragend); 
            }
            

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
                element.css('top' , (element.prop('offsetTop') + distY)+ "px");

                $rootScope.$broadcast('dragover', ondragover());

                function ondragover() {
                    return {x: e.screenX, y: e.screenY};
                }

            }
            
            function dragend(e) {
                console.log("drag end");

                //element.css('position', 'relative');
                $rootScope.$broadcast('dragend', ondragend());

                function ondragend() {
                    return element;
                }

                element.off('mousemove', dragover);
                element.off('mouseup', dragend);
            }
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
                element.on('mouseover', dropstart);

                function dropstart(e) {
                    e = e || $window.event;
                    e.preventDefault();
                    
                    console.log(e.clientX);
                    console.log('drop start');
                }


                function insideElement(x, y) {
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
                        element.removeClass('dragover')
                        element.addClass('undrag')

                    }
                }
                $rootScope.$on('dragend', function(e, mass) {
                    if (isInside) {
                        mass.css('left', "");
                        mass.css('top', "");
                        mass.css('z-index', "");
                        mass.css('position', 'relative');
                        element[0].firstElementChild.appendChild(mass[0]);
                    } 
                });
            }
        }
        

    }])



