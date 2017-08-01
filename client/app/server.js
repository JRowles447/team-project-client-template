import {readDocument, writeDocument, addDocument} from './database.js';

/**
 * Emulates how a REST call is *asynchronous* -- it calls your function back
 * some time in the future with data.
 */
function emulateServerReturn(data, cb) {
  setTimeout(() => {
    cb(data);
  }, 1);
}

/**
 * Given a feed item ID, returns a FeedItem object with references resolved.
 * Internal to the server, since it's synchronous.
 */
function getMyEventSync(myEventListId) {
  var myEventList = readDocument('myEventLists', myEventListId);
  myEventList.contents = myEventList.contents.map((eventEntry) => readDocument('eventList', eventEntry));
  return myEventList;
}

function getEventSync(eventId) {
  var eventItem = readDocument('eventList', eventId);
  return eventItem
}


/**
 * Emulates a REST call to get the feed data for a particular user.
 * @param user The ID of the user whose feed we are requesting.
 * @param cb A Function object, which we will invoke when the Feed's data is available.
 */
 //Read all of the myEvent data for the user
export function getMyEventData(user, cb) {
  // Get the User object with the id "user".
  var userData = readDocument('users', user);

  // Get the Event list for the user.
  var eventListData = readDocument('myEventLists', userData.myEventList);

  // Return EventData with resolved references.
  // emulateServerReturn will emulate an asynchronous server operation, which
  // invokes (calls) the "cb" function some time in the future.
  eventListData.contents = eventListData.contents.map(getEventSync);
  emulateServerReturn(eventListData, cb);
}

export function getEvent(eventId, cb) {
  //pull the event data
  var eventData = readDocument('eventList', eventId);
  eventData.contents = getEventSync(eventId);
  emulateServerReturn(eventData, cb);
}

export function createNewEvent(user, eventName, org, org_link, image, time, location, description, category, cb) {
  // If we were implementing this for real on an actual server, we would check
  // that the user ID is correct & matches the authenticated user. But since
  // we're mocking it, we can be less strict.

  // Get the current UNIX time.
  var createTime = new Date().getTime();
  // The new event object. The database will assign the ID for us.
  var newEvent = {
    "author": user,
    "eventName": eventName,
    "org": org,
    "org_link": org_link,
    "image": image,
    "time": time,
    "location": location,
    "description": description,
    "category": category,
    "createTime": createTime
  };

  // Add the status update to the database.
  // Returns the status update w/ an ID assigned.
  newEvent = addDocument('eventList', newEvent);

  // Add the status update reference to the front of the current user's feed.
  var userData = readDocument('users', user);
  var eventData = readDocument('myEventLists', userData.myEventList);
  eventData.unshift(newEvent._id);

  //???
  // Update the feed object.
  writeDocument('myEventLists', newEvent);

  // Return the newly-posted object.
  emulateServerReturn(newEvent, cb);
}

/**
 * REMOVE a new event to the database on the given event item.
 * Returns the updated Event.
 */
export function removeEventFromMasterList(eventItemId, userId, cb) {
  var user = readDocument('users', userId)
  var eventItem = readDocument('eventList', eventItemId)
  if (user === eventItem.author){
    this.eventList.splice(eventItemId, 1)
  }
  // Return a resolved version of the event item so React can
  // render it.
  emulateServerReturn(eventItemId, cb);
}

/**
 * Adds a new event to the database on the given event item.
 * Returns the updated Event.
 */
export function addEventToMyEvents(eventItemId, userId, cb) {
  var user = readDocument('users', userId)
  user.myEventList.contents.push(eventItemId)

  // Return a resolved version of the event item so React can
  // render it.
  emulateServerReturn(userId, cb);
}

/**
 * removes an event to the database on the given event item.
 * Returns the updated Event object.
 */
export function removeEventFromMyEvents(eventItemId, userId, cb) {
  var user = readDocument('users', userId)
  user.myEventList.contents.splice(eventItemId, 1)

  // Return a resolved version of the event item so React can
  // render it.
  emulateServerReturn(userId, cb);
}
