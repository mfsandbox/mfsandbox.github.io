"use strict"

const _ = require('lodash');
const dotInfoArray = function(cardCount, cardIndex, dotRadiusMap)
{
    const perspectiveThreshold = dotRadiusMap.length + 2; //This constant determines the threshold for perspective effect.  If there are fewer cards than this all dots are the same size
    const maxDotExcursion = dotRadiusMap.length - 1;      //This constant sets the maximum number of dots to the right and or left of the excursion center

    let excursionCenter = cardIndex;

    //The following two lines ensure that the excursion center is never at the leftmost or rightmost position
    if (cardIndex ==1) {excursionCenter = 2};
    if (cardIndex == cardCount) {excursionCenter = cardCount - 1};

    let leftMostIndex = 1;
    let rightMostIndex = cardCount;
    if (cardCount < perspectiveThreshold) {
        return _.range(leftMostIndex,rightMostIndex + 1).map(function(dotIndex){return {radius: dotRadiusMap[0], current: (dotIndex == cardIndex)} ;})
    }

    leftMostIndex = _.max([1,excursionCenter - maxDotExcursion]);
    rightMostIndex = _.min([cardCount, excursionCenter + maxDotExcursion ]);

    return _.range(leftMostIndex,rightMostIndex + 1).map(function(dotIndex) {
        let excursion = Math.abs(dotIndex - excursionCenter);
        return {radius: dotRadiusMap[excursion], current: (dotIndex == cardIndex)};

    })
}

const dotPanelSvg = function(cardCount, cardIndex, dotRGB, dotPanelHeight, dotPanelWidth, dotRadiusMap) {
    const dotPanelYCenter = dotPanelHeight / 2;
    const dotInfos = dotInfoArray(cardCount, cardIndex, dotRadiusMap);
    const dotSpaceBetween = 9;
    let dotCenter = 0;

    const currentRGBA = `rgba(${dotRGB.red},${dotRGB.green},${dotRGB.blue},1)`;   //RGB color of the dot corresponding to the active card
    const otherRGBA = `rgba(${dotRGB.red},${dotRGB.green},${dotRGB.blue},0.3)`;   //RGB color of the dot corresponding to inactive cards


    const dotLeftOffsets = dotInfos.map(function (dotInfo,dotIndex) {
        if (dotIndex == 0) {
            return dotCenter;}
        else {
            dotCenter = dotCenter + dotSpaceBetween + dotInfo.radius + dotInfos[dotIndex - 1].radius;
            return dotCenter;
        }

    },dotInfos)

    const dotsLeftOrigin = (dotPanelWidth / 2) - (dotLeftOffsets[dotLeftOffsets.length-1] / 2);

    const dotArrayCenters = dotLeftOffsets.map(function(dotLeftOffset) {
        return dotLeftOffset + dotsLeftOrigin;
    })

    return dotInfos.map(function(dotInfo,dotIndex) {
        return `<circle cy = '${dotPanelYCenter}px' cx = '${dotArrayCenters[dotIndex]}px' r = '${dotInfo.radius}px' fill='${dotInfo.current ? currentRGBA : otherRGBA}'></circle>`;
    })
}


module.exports.dotInfoArray = dotInfoArray;
module.exports.dotPanelSvg = dotPanelSvg;
