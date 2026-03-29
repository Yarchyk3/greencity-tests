#  Test Cases: GreenCity Events Page

##  Page under test

https://www.greencity.cx.ua/#/greenCity/events

## 1: Verify Events Page Loads Successfully

User has a stable internet connection and an open web browser.

| Step | Action                   | Data                                           | Expected Result                                |
| ---- | ------------------------ | ---------------------------------------------- | ---------------------------------------------- |
| 1    | Open browser             | Chrome                                         | Browser opens successfully                     |
| 2    | Enter URL in address bar | https://www.greencity.cx.ua/#/greenCity/events | Page starts loading                            |
| 3    | Wait for page to load    | —                                              | Events page is displayed with a list of events |

---

## 2: Verify Event Cards Display Correct Information

User is on the GreenCity events page.

| Step | Action                  | Data | Expected Result                                     |
| ---- | ----------------------- | ---- | --------------------------------------------------- |
| 1    | Observe event cards     | —    | Event cards are visible on the page                 |
| 2    | Check event title       | —    | Each card contains a visible event title            |
| 3    | Check event date        | —    | Each card displays a valid event date               |
| 4    | Check event description | —    | Each card contains a short description of the event |

---

## 3: Verify Navigation to Event Details Page

User is on the GreenCity events page with visible event cards.

| Step | Action                  | Data | Expected Result                                            |
| ---- | ----------------------- | ---- | ---------------------------------------------------------- |
| 1    | Click on any event card | —    | User is redirected to the event details page               |
| 2    | Observe event details   | —    | Detailed information about the selected event is displayed |

---

## 4: Verify Behavior with Incorrect URL 

User has an open web browser.

| Step | Action                             | Data                                  | Expected Result                                     |
| ---- | ---------------------------------- | ------------------------------------- | --------------------------------------------------- |
| 1    | Enter incorrect URL in address bar | https://www.greencity.cx.ua/wrongpage | Error page or “Page not found” message is displayed |
