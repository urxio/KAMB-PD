document.addEventListener("DOMContentLoaded", function () {
    let djs = [
        {
            name: "Sabrina Colton",
            yearsExperience: 2,
            showName: "Sabrina's Special",
            genre: "Ambient Mix",
        },
        {
            name: "Jason Press",
            yearsExperience: 4,
            showName: "Jason's Garden",
            genre: "Ambient Dreamscapes",
        },
        {
            name: "Grant Xhaka",
            yearsExperience: 2,
            showName: "Unwind with Grant",
            genre: "Ambient Meditation",
        },
        {
            name: "Richie Pearson",
            yearsExperience: 5,
            showName: "Energixe with Richie",
            genre: "Deep Listening",
        },
        {
            name: "Helena Celo",
            yearsExperience: 3,
            showName: "Helena's Melodies",
            genre: "Ambient Soul",
        },
        {
            name: "Erick Dalton",
            yearsExperience: 4,
            showName: "Forest Breathing",
            genre: "Ambient Relaxation",
        }
    ];

    // Find the DJ to update
    let djToUpdate = djs[1];

    // Update existing properties
    djToUpdate.yearsExperience = 5;

    // Add a new property
    djToUpdate.availability = "Mon-Fri";

    for (let i = 0; i < djs.length; i++) {
        updateDJInfo(djs[i], "dj" + (i + 1));
    }
});

function updateDJInfo(dj, idPrefix) {
    document.getElementById(idPrefix + "-name").textContent = dj.name;
    document.getElementById(idPrefix + "-yearsExperience").textContent = dj.yearsExperience;
    document.getElementById(idPrefix + "-showName").textContent = dj.showName;
    document.getElementById(idPrefix + "-genre").textContent = dj.genre;

    if (dj.availability) {
        document.getElementById(idPrefix + "-availability").textContent = dj.availability;
    }
}