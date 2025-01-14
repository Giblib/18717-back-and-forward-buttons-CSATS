videojs.registerPlugin('backForwardButtons', function() {
  var myPlayer = this,
      backJumpAmount = 10,
      forwardJumpAmount = 30,
      controlBar,
      insertBeforeNode,
      newElementBB = document.createElement('div'),
      newElementFB = document.createElement('div'),
      newImageBB = document.createElement('img'),
      newImageFB = document.createElement('img');

  // +++ Assign IDs for later element manipulation +++
  newElementBB.id = 'backButton';
  newElementFB.id = 'forwardButton';

  newElementBB.className = 'backButton';
  newElementFB.className = 'forwardButton';

  // +++ Assign properties to elements and assign to parents +++
  newImageBB.setAttribute('src', 'https://raw.githubusercontent.com/Giblib/18717-back-and-forward-buttons-CSATS/master/img/Backward_30-01.svg');
  newElementBB.appendChild(newImageBB);
  newImageFB.setAttribute('src', 'https://raw.githubusercontent.com/Giblib/18717-back-and-forward-buttons-CSATS/master/img/Forward-01.svg');
  newElementFB.appendChild(newImageFB);

  // +++ Get controlbar and insert elements +++
  controlBar = myPlayer.$('.vjs-control-bar');
  // Get the element to insert buttons in front of in conrolbar
  insertBeforeNode = myPlayer.$('.vjs-volume-panel');

  // Insert the button div in proper location
  controlBar.insertBefore(newElementBB, insertBeforeNode);
  controlBar.insertBefore(newElementFB, insertBeforeNode);

  // +++ Add event handlers to jump back or forward +++
  // Back button logic, don't jump to negative times
  newElementBB.addEventListener('click', function () {
    var newTime,
        rewindAmt = backJumpAmount,
        videoTime = myPlayer.currentTime();
    if (videoTime >= rewindAmt) {
      newTime = videoTime - rewindAmt;
    } else {
      newTime = 0;
    }
    myPlayer.currentTime(newTime);
  });

  // Forward button logic, don't jump past the duration
  newElementFB.addEventListener('click', function () {
    var newTime,
        forwardAmt = forwardJumpAmount,
        videoTime = myPlayer.currentTime(),
        videoDuration = myPlayer.duration();
    if (videoTime + forwardAmt <= videoDuration) {
      newTime = videoTime + forwardAmt;
    } else {
      newTime = videoDuration;
    }
    myPlayer.currentTime(newTime);
  });
});
