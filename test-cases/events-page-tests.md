#  Test Cases: GreenCity Events Page
https://www.greencity.cx.ua/#/greenCity/events

## TC-01: Page load
User has a stable internet connection and an open web browser.

| Step | Action                   | Data                                           | Expected Result                                |
| ---- | ------------------------ | ---------------------------------------------- | ---------------------------------------------- |
| 1    | Open browser             | Chrome                                         | Browser opens successfully                     |
| 2    | Enter URL in address bar | https://www.greencity.cx.ua/#/greenCity/events | Page starts loading                            |
| 3    | Wait for page to load    | —                                              | Events page is displayed with a list of events |

---

## TC-02: Event cards

User is on the GreenCity events page.

| Step | Action                  | Data | Expected Result                                     |
| ---- | ----------------------- | ---- | --------------------------------------------------- |
| 1    | Observe event cards     | —    | Event cards are visible on the page                 |
| 2    | Check event title       | —    | Each card contains a visible event title            |
| 3    | Check event date        | —    | Each card displays a valid event date               |
| 4    | Check event description | —    | Each card contains a short description of the event |

---

## TC-03: Navigation

User is on the GreenCity events page with visible event cards.

| Step | Action                  | Data | Expected Result                                            |
| ---- | ----------------------- | ---- | ---------------------------------------------------------- |
| 1    | Click on any event card | —    | User is redirected to the event details page               |
| 2    | Observe event details   | —    | Detailed information about the selected event is displayed |

---

## TC-04: Negative test 

User has an open web browser.

| Step | Action                             | Data                                  | Expected Result                                     |
| ---- | ---------------------------------- | ------------------------------------- | --------------------------------------------------- |
| 1    | Enter incorrect URL in address bar | https://www.greencity.cx.ua/wrongpage | Error page or “Page not found” message is displayed |
