DrawWithMe
==========
This project is a web application that allows users to chat with each other and draw images on a shared screen.

Author: Suharsh Sivakumar

Goals
-----
* Understand how request responses can be sent to multiple clients at the same time.
* Understand long-polling
* Understand websockets
* Practice Javascript and JQuery

Technologies Used
-----------------
* Tornado
* HTML5 websockets
* JQuery

Note: I made one version of the application using long-polling with the JQuery.ajax function but this turned out to be extremely inefficient compared to using HTML5 websockets along with the tornado.websockets module.
