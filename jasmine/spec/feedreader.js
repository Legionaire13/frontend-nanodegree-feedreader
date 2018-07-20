/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We"re placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don"t run until the DOM is ready.*/
$(function () {
    /* This suite is all about the RSS feeds definitions, the allFeeds variable in our application. */
    describe("RSS Feeds", function () {

        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it("are defined", function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* We Loop through each feed in the allFeeds object and ensure it has a URL defined and that the URL is not empty. */
        it("have every url defined", function () {
            for (var feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url).toContain("http://");
                expect(feed.url.length).not.toBe(0);
            }
        });

        /* We Loop through each feed in the allFeeds object and ensure it has a name defined and that the name is not empty */
        it("have every name defined", function () {
            for (var feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });


    /* Test suite named "The menu" */
    describe("The menu", function () {
        let buffer, isHidden, menuIconLink;
        beforeEach(function () {
            buffer = document.querySelector("body");
            isHidden = buffer.classList.contains("menu-hidden");
        });

        /* Test suite that ensures the menu element is hidden by default.*/
        it("hidden by default", function () {
            expect(isHidden).toBeTruthy();
        });

        /* Test that ensures the menu changes visibility when the menu icon is clicked and hides when clicked again. */
        it("changes visibility on first click", function () {
            menuIconLink = document.querySelector(".menu-icon-link");
            menuIconLink.click(); //triggers event

            buffer = document.querySelector("body");
            isHidden = buffer.classList.contains("menu-hidden");

            expect(isHidden).toBeFalsy();
        });
        /* Testing the second click */
        it("changes visibility if clicked again", function () {
            menuIconLink = document.querySelector(".menu-icon-link");
            menuIconLink.click(); //triggers event via Jquery

            buffer = document.querySelector("body");
            isHidden = buffer.classList.contains("menu-hidden");

            expect(isHidden).toBeTruthy();
        });

    });

    /* "Initial Entries" */
    describe("Initial Entries", function () {

        /* Test that ensures when the loadFeed function is called and completes its work, there is at least a single .entry element within the .feed container.*/
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        it("feed has at least one entry element", function (done) {
            let feed;
            feed = document.querySelector(".feed");
            expect(feed.childElementCount).not.toBe(0);
            done();
        });
    });

    /* "New Feed Selection" */
    describe("New Feed Selection", function () {

        /* Test ensures when a new feed is loaded by the loadFeed function that the content actually changes. */
        let firstFeedLoaded, secondFeedLoaded;
        beforeEach(function (done) {
            loadFeed(0, function () {
                firstFeedLoaded = document.querySelector(".feed").innerHTML;
                done();
            });
            loadFeed(1, function () {
                secondFeedLoaded = document.querySelector(".feed").innerHTML;
                done();
            });
        });

        it("content changes when a new feed is loaded", function () {
            expect(firstFeedLoaded).not.toEqual(secondFeedLoaded);
        });

    });
}());