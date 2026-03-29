# Test Cases

## TC-01: Verify Events Page Loads

**Preconditions:**

* Internet connection
* Browser is open

| Step | Action           | Data                                           | Expected Result      |
| ---- | ---------------- | ---------------------------------------------- | -------------------- |
| 1    | Open browser     | Chrome                                         | Browser opens        |
| 2    | Enter URL        | https://www.greencity.cx.ua/#/greenCity/events | Page loads           |
| 3    | Wait for loading | —                                              | Events are displayed |

---

## TC-02: Verify Event Cards Display

**Preconditions:**

* User is on events page

| Step | Action            | Data | Expected Result          |
| ---- | ----------------- | ---- | ------------------------ |
| 1    | Observe cards     | —    | Cards are visible        |
| 2    | Check title       | —    | Title is displayed       |
| 3    | Check date        | —    | Date is displayed        |
| 4    | Check description | —    | Description is displayed |

---

## TC-03: Verify Navigation to Event Details

**Preconditions:**

* User is on events page

| Step | Action         | Data | Expected Result            |
| ---- | -------------- | ---- | -------------------------- |
| 1    | Click on event | —    | Event page opens           |
| 2    | Check content  | —    | Detailed info is displayed |

