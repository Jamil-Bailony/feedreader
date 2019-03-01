/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has a URL defined', function () {
            for (let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.constructor).toBe(String);
                expect(feed.url.length).toBeGreaterThan(0);
            }
        });


        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('has a name defined', function () {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.constructor).toBe(String);
                expect(feed.name.length).toBeGreaterThan(0);
            }
        });
    });


    /* This is the scond test suite named "The menu". It just contains
     * a related set of tests that are all about the the menu. */

    describe('The menu', function () {

        /* This is a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden be default', function () {
            let isMenuHidden = document.querySelector('body').classList.contains('menu-hidden');
            expect(isMenuHidden).toBe(true);
        });

        /* THis is a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('changes visibility when the menu icon is clicked', function () {
            let menuIcon = $('.menu-icon-link');
            let body = document.querySelector('body');

            // First click
            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);

            // Second click
            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });

    });

    /* This is the third test suite named "Initial Entries". It just contains
     * a related set of tests that check the values of initial entries */
    describe('Initial Entries', function () {


        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function (done) {
            loadFeed(1, done);
        });

        it('has at leat one feed in within the .feed container', function () {
            let entries = document.querySelectorAll('div.feed article.entry');
            expect(entries.length).toBeGreaterThan(0);
        })

    });

    /* TODO: Write a new test suite named "New Feed Selection". It just contains
     * a related set of tests that check the content f feed contaned after new 
     * feed loaded */
    describe('New Feed Selection', function () {
        /* This is a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        let firstFeedContent = '',
            secondFeedContent = '';

        beforeEach(function (done) {
            loadFeed(1, function () {
                firstFeedContent = document.querySelector('div.feed').innerHTML;
                loadFeed(2, function () {
                    secondFeedContent = document.querySelector('div.feed').innerHTML;

                    done();
                });
            });
        });
        it('is changed when new feed loaded', function () {
            expect(firstFeedContent).not.toBe(secondFeedContent);
        });
    });

}());
