/* global Converter, probandDatav2 */

describe('Converter', function() {
    describe('load', function() {
        it('should load proband data', function() {
            var converter = new Converter();
            converter.load(probandDatav2);
            expect(converter.data).to.deep.equal(probandDatav2);
        });

        it('sould create empty comments object', function() {
            var converter = new Converter();
            converter.load(probandDatav2);
            expect(converter.comments).to.deep.equal({});
        });

        it('sould create empty diary array', function() {
            var converter = new Converter();
            converter.load(probandDatav2);
            expect(converter.diary).to.deep.equal([]);
        });

        it('sould create empty interactions array', function() {
            var converter = new Converter();
            converter.load(probandDatav2);
            expect(converter.interactions).to.deep.equal([]);
        });
    });

    describe('convertComments', function() {
        it('sould convert v2 diary format to v1 diary format', function() {
            var commentsDatav1 = {
                "3c92a4df": "1389823488 ~ ein Freund von mir hat ein Scherz über Bundeswehr gepostet, ich fand es sehr witzig ",
                "0a81f271": "1389823819 ~ ich habe ein Link von einer Kommilitonin kommentiert, es ging um \"52 Places to go in 2014\" von NY-Times, obwohl München und Berlin nicht dabei sind, ist Frankfurt dabei, naja ich persönlich finde es gibt schönere Plätze in Deutschland ",
                "7bcddf87": "1389911628 ~ es geht um eine online Umfrage bezüglich unserer Kantine im Niederrad, gepostet hat ein Mitlied des Studentenrates",
                "13901343": "1390134335 ~ Ich kommentiere einen Zeitungsartikel, den ich selbst geteilt habe. Es wurde in der Rhein-Neckar-Zeitung veröffentlicht und geht darum, dass das Kino in der Altstadt schleißt. Ich finde es sehr traurig, viele Erinnerungen hängen daran, deswegen habe ich mich entschieden es mit meinen Freunden zu teilen. ",
                "75019456": "1390134527 ~ Es handelt sich dabei um eine bezahlte Werbung von Watchever, einen \"online video stream\" Anbieter. Es geht um ein Gewinnspiel. Mich nerven diese Werbeanzeigen...",
                "70e816cf": "1390328184 ~ ",
                "ba5dfbdb": "1390341915 ~ Ich kommentiere einen Videoclip, welches von einer Gruppe gepostet wurde. Es handelt sich dabei um ein Musikvideo von David Guetta, sehr cool, gefällt mir."
            };

            var converter = new Converter();
            converter.load(probandDatav2);
            converter.convertComments();

            expect(converter.comments).to.deep.equal(commentsDatav1);
        });
    });

    describe('convertInteractions', function() {
        it('should convert v2 interactions format to v1 interactions format', function() {
            var interactionsDatav1 = [{
                "nr": 0,
                "interaction_type": "openFacebook",
                "time": "2014-01-15T19:45:49.374Z",
                "network": "Facebook"
            }, {
                "nr": 1,
                "interaction_type": "closeFacebook",
                "time": "2014-01-15T21:24:14.670Z",
                "network": "Facebook"
            }, {
                "nr": 2,
                "interaction_type": "openFacebook",
                "time": "2014-01-15T21:24:14.761Z",
                "network": "Facebook"
            }, {
                "nr": 3,
                "interaction_type": "like",
                "time": "2014-01-15T21:45:57.751Z",
                "network": "Facebook",
                "object_id": "3e799b96",
                "object_owner": "9cb2fda2",
                "object_type": "status"
            }, {
                "nr": 4,
                "interaction_type": "like",
                "time": "2014-01-15T21:58:48.983Z",
                "network": "Facebook",
                "object_id": "3c92a4df",
                "object_owner": "1abcc45b",
                "object_type": "status"
            }];

            var converter = new Converter();
            converter.load(probandDatav2);
            converter.convertInteractions();

            var convertedInteractions = converter.interactions.splice(0, 5);

            expect(convertedInteractions).to.deep.equal(interactionsDatav1);
        });
    });

    describe('convertDiary', function() {
        it('sould convert v2 diary format to v1 diary format', function() {
            var diaryDatav1 = [
                ["2014-01-15T22:02:33.565Z", "habe eine Freundschaftsanfrage geschickt"],
                ["2014-01-16T22:13:34.870Z", "Ein guter Freund von mir ist wieder bei Facebook. Anfang September hat er sein Facebook-Account deaktiviert wegen Staatsexamen, jetzt ist er wieder da. "],
                ["2014-01-19T12:33:18.834Z", "gestern wurde ich wieder in eine Gruppe der \"Studenten Karlsruhe\" eingeladen, obwohl ich schon mal eingeladen wurde und ich ausgetreten bin...\nwas ich nicht verstehe, dass obwohl ich nirgendswo zugestimmt habe, war ich automatisch ein Mitglied der Gruppe und konnte alles sehen...\njetzt bin ich wieder ausgetreten, und so eingestellt, dass mich Leute nicht wieder einladen können!"],
                ["2014-01-21T22:37:24.245Z", "was mich zur Zeit nervt, ist das Häkchen bei einer gelesener Nachricht, leider klicke ich manchmal auf eine neue Nachricht und der Absender weißt sofort, dass ich es gesehen habe...\ngenau das wollte ich heute in den Einstellungen ändern, leider fand ich nichts... "],
                ["2014-01-22T22:35:26.653Z", "Eine Freundin wollte heute in Facebook wissen, wie man es so einstellen kann, dass z. B. Google deine Facebook-Seite nicht als Ergebnis anzeigt, wenn man den Namen eingetippt..."]
            ];

            var converter = new Converter();
            converter.load(probandDatav2);
            converter.convertDiary();

            expect(converter.diary).to.deep.equal(diaryDatav1);
        });
    });
});
