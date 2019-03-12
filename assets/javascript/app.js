var question1 = {
    id: 1,
    text: "What is the most popular car used in the RLCs?",
    options: ["Octane", "Dominus", "Scarab", "Batmobile"],
    answer: "Octane"
};

var question2 = {
    id: 2,
    text: "Who won the first ever RLCs World Championships?",
    options: ["iBUYPOWER", "Flipsid3 Tactics", "G2", "Cloud9"],
    answer: "iBUYPOWER"
};

var question3 = {
    id: 3,
    text: "Who won the latest RLCs World Championships (season 6)?",
    options: ["NRG Esports", "Dignitas", "We Dem Girlz", "Cloud9"],
    answer: "Cloud9"
};

var question4 = {
    id: 4,
    text: "What car does Kuxir97 of Flipsid3 Tactics use?",
    options: ["Octane", "Batmobile", "Dominus", "Venom"],
    answer: "Batmobile"
};

var question5 = {
    id: 5,
    text: "What team does SquishyMuffinz play for?",
    options: ["G2", "Dignitas", "NRG Esports", "Cloud9"],
    answer: "Cloud9"
};

var questions = [question1, question2, question3, question4, question5];
// resetTimer and Timer should always be initialized the same.  This is so you do not have to 
// change the reset number in the function if you want to change the time the user has.
var resetTimer = 100;
var timer = 100;
var timerID;

$(document).ready(function() {

    $("#start-button").on("click", function() {

        console.log("In start button");
        $("#start-button").hide();
        
        for (var i = questions.length - 1; i >= 0; i--) {
            var formGroup = makeFormGroup(questions[i]);
            $("#question-container").prepend(formGroup);
        }

        $("#question-container").show();

        startTimer();
    });

    $("#submit-button").on("click", showResults);

    $("#reset-button").on("click", function() {
        $("#result-container").hide();
        $("#start-button").show();
        timer = resetTimer;

        // Have to empty the question container but also remake the submit button
        $(".form-group").remove();

    });

    function makeFormGroup(ques) {
        var form = $("<div>").addClass("form-group");
        form.append($("<label>").attr("for", "question").text(ques.text).css("display", "block"));
        for (var j = 0; j < ques.options.length; j++) {
            form.append(makeRadioButtons(ques, ques.options[j]));
        }

        return form;
    }

    function makeRadioButtons(ques, option) {
        var radioDiv = $("<div>").addClass("form-check form-check-inline");
        var radioInput = $("<input>").addClass("form-check-input").attr({
            type: "radio",
            id: option + ques.id,
            name: ques.id,
            value: option
        });
        var radioLabel = $("<label>").addClass("form-check-label").attr({
            for: option + ques.id,
        }).text(option);

        radioDiv.append(radioInput).append(radioLabel);

        return radioDiv;
    }

    function startTimer() {

        $("#timer").text(timer);
        $("#timer").show();
        timerID = setInterval(decrementTimer, 1000);

    }

    function decrementTimer() {
        timer--;

        $("#timer").text(timer);

        if (timer === 0) {
            showResults();
        }
    }

    function showResults(event) {

        event.preventDefault();
        clearInterval(timerID);
        evaluateResults();

        $("#question-container").hide();
        $("#timer").hide();
        $("#result-container").show();

    }

    function evaluateResults() {
        var correct = 0;
        var incorrect = 0;
        var unanswered = 0;
        var answers = $("input:checked");

        for (var i = 0; i < questions.length; i++){
            if (answers[i] === undefined){
                unanswered++;
            } else if (answers[i].value === questions[i].answer) {
                correct++;
            } else {
                incorrect++;
            }
        }

        $("#correct-answers").text(correct);
        $("#incorrect-answers").text(incorrect);
        $("#unanswered").text(unanswered);
    }
});