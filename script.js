// ===============================
// STUDYFLOW - TASK PROGRESS
// ===============================


// SUBJECTS

const subjects = ["cv", "dm", "iot", "daa", "dl"];


// ===============================
// LOAD SAVED TASKS
// ===============================

let taskProgress = JSON.parse(
    localStorage.getItem("studyFlowTasks")
) || {
    cv: [false, false, false, false, false, false],
    dm: [false, false, false, false, false, false],
    iot: [false, false, false, false, false, false],
    daa: [false, false, false, false, false, false],
    dl: [false, false, false, false, false, false]
};


// Make sure every subject has exactly 6 tasks

subjects.forEach(subject => {

    if (
        !Array.isArray(taskProgress[subject]) ||
        taskProgress[subject].length !== 6
    ) {

        taskProgress[subject] = [
            false,
            false,
            false,
            false,
            false,
            false
        ];

    }

});


// ===============================
// SAVE TASKS
// ===============================

function saveTasks() {

    localStorage.setItem(
        "studyFlowTasks",
        JSON.stringify(taskProgress)
    );

}


// ===============================
// COUNT COMPLETED TASKS
// ===============================

function getCompleted(subject) {

    return taskProgress[subject].filter(
        task => task === true
    ).length;

}


// ===============================
// TOTAL COMPLETED TASKS
// ===============================

function getTotalCompleted() {

    let total = 0;

    subjects.forEach(subject => {

        total += getCompleted(subject);

    });

    return total;

}


// ===============================
// UPDATE PROGRESS
// ===============================

function updateProgress() {

    const totalCompleted =
        getTotalCompleted();

    const totalTasks = 30;

    const percentage =
        Math.round(
            (totalCompleted / totalTasks) * 100
        );


    // ==================================================
    // HOME PAGE
    // ==================================================

    const heroProgressText =
        document.getElementById(
            "heroProgressText"
        );

    const heroMiniProgress =
        document.getElementById(
            "heroMiniProgress"
        );

    const overallProgressText =
        document.getElementById(
            "overallProgressText"
        );

    const overallProgressFill =
        document.getElementById(
            "overallProgressFill"
        );

    const progressStatus =
        document.getElementById(
            "progressStatus"
        );


    // -------------------------------
    // BIG CIRCULAR PROGRESS
    // -------------------------------

    if (heroProgressText) {

        heroProgressText.textContent =
            percentage + "%";

    }


    const heroProgressRing =
        document.querySelector(
            ".progress-ring"
        );


    if (heroProgressRing) {

        const degree =
            percentage * 3.6;

        const progressColor =
            percentage >= 75
                ? "green"
                : "red";


        heroProgressRing.style.background =
            `conic-gradient(
                ${progressColor} ${degree}deg,
                #e5e5e5 ${degree}deg
            )`;

    }


    // -------------------------------
    // SMALL HOME PROGRESS BAR
    // -------------------------------

    if (heroMiniProgress) {

        heroMiniProgress.style.width =
            percentage + "%";

        heroMiniProgress.style.background =
            percentage >= 75
                ? "green"
                : "red";

    }


    // -------------------------------
    // OVERALL PROGRESS TEXT
    // -------------------------------

    if (overallProgressText) {

        overallProgressText.textContent =
            percentage +
            "% of all study tasks completed.";

    }


    // -------------------------------
    // OVERALL PROGRESS BAR
    // -------------------------------

    if (overallProgressFill) {

        overallProgressFill.style.width =
            percentage + "%";


        if (percentage >= 75) {

            overallProgressFill.style.background =
                "green";

        } else {

            overallProgressFill.style.background =
                "red";

        }

    }


    // -------------------------------
    // PROGRESS STATUS
    // -------------------------------

    if (progressStatus) {

        if (percentage >= 75) {

            progressStatus.textContent =
                "Great work! You reached 75% 🎉";

        } else {

            progressStatus.textContent =
                "Complete your tasks to reach 75%.";

        }

    }


    // ==================================================
    // SUBJECT CIRCLES ON HOME
    // ==================================================

    subjects.forEach(subject => {

        const completed =
            getCompleted(subject);


        const percent =
            Math.round(
                (completed / 6) * 100
            );


        const circle =
            document.querySelector(
                `[data-progress-circle="${subject}"]`
            );


        if (circle) {

            const text =
                circle.querySelector("span");


            if (text) {

                text.textContent =
                    percent + "%";

            }


            const degree =
                percent * 3.6;


            circle.style.background =
                `conic-gradient(
                    #222 ${degree}deg,
                    #e5e5e5 ${degree}deg
                )`;

        }

    });


    // ==================================================
    // PROGRESS PAGE
    // ==================================================

    const progressPageText =
        document.getElementById(
            "progressPageText"
        );

    const progressPageFill =
        document.getElementById(
            "progressPageFill"
        );

    const progressPageStatus =
        document.getElementById(
            "progressPageStatus"
        );


    // -------------------------------
    // PROGRESS PAGE TEXT
    // -------------------------------

    if (progressPageText) {

        progressPageText.textContent =
            percentage +
            "% of all study tasks completed.";

    }


    // -------------------------------
    // PROGRESS PAGE BAR
    // -------------------------------

    if (progressPageFill) {

        progressPageFill.style.width =
            percentage + "%";


        if (percentage >= 75) {

            progressPageFill.style.background =
                "green";

        } else {

            progressPageFill.style.background =
                "red";

        }

    }


    // -------------------------------
    // PROGRESS PAGE STATUS
    // -------------------------------

    if (progressPageStatus) {

        if (percentage >= 75) {

            progressPageStatus.textContent =
                "Great work! You reached 75% 🎉";

        } else {

            progressPageStatus.textContent =
                "Complete your tasks to reach 75%.";

        }

    }


    // ==================================================
    // SUBJECT COUNTS ON PROGRESS PAGE
    // ==================================================

    subjects.forEach(subject => {

        const element =
            document.getElementById(
                "progress" +
                subject.charAt(0).toUpperCase() +
                subject.slice(1)
            );


        if (element) {

            element.textContent =
                getCompleted(subject) +
                " / 6";

        }

    });


    // ==================================================
    // TASK COUNTS ON HOME
    // ==================================================

    subjects.forEach(subject => {

        const count =
            getCompleted(subject);


        const element =
            document.getElementById(
                subject + "TaskCount"
            );


        if (element) {

            element.textContent =
                count + " / 6";

        }

    });

}


// ==================================================
// TASK CHECKBOXES
// ==================================================

const checkboxes =
    document.querySelectorAll(
        'input[type="checkbox"][data-subject]'
    );


// IMPORTANT:
// Separate task index for each subject

const subjectIndexes = {

    cv: 0,

    dm: 0,

    iot: 0,

    daa: 0,

    dl: 0

};


// Connect every checkbox

checkboxes.forEach(checkbox => {

    const subject =
        checkbox.dataset.subject;


    // Get the correct task number
    // for this subject

    const taskIndex =
        subjectIndexes[subject];


    // Move to the next task
    // for this subject

    subjectIndexes[subject]++;


    // Restore saved checkbox state

    checkbox.checked =
        taskProgress[subject][taskIndex];


    // When checkbox is clicked

    checkbox.addEventListener(
        "change",
        function () {

            taskProgress[subject][taskIndex] =
                checkbox.checked;


            // Save the new state

            saveTasks();


            // Update all progress

            updateProgress();

        }
    );

});


// ==================================================
// INITIAL UPDATE
// ==================================================

updateProgress();