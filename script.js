// Firebase Configuration
const firebaseConfig = {
            apiKey: "AIzaSyCnfD4uU4MkLqHMB5aeuJS7yULxgX227SA",
            authDomain: "familymenu-8c05a.firebaseapp.com",
            databaseURL: "https://familymenu-8c05a-default-rtdb.firebaseio.com",
            projectId: "familymenu-8c05a",
            storageBucket: "familymenu-8c05a.firebasestorage.app",
            messagingSenderId: "441105128576",
            appId: "1:441105128576:web:6019777d78883fef6bda65"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// DOM References
const mealContainer = document.getElementById('meal-container');

// Fetch Meals and Display
const mealRef = database.ref('mealPlans');
mealRef.once('value').then(snapshot => {
    const meals = snapshot.val();

    if (!meals) {
        mealContainer.innerHTML = "<p>No meals available.</p>";
        return;
    }

    Object.keys(meals).forEach(mealKey => {
        const meal = meals[mealKey];

        // Create Meal Card
        const card = document.createElement('div');
        card.className = 'meal-card';

        const mealName = document.createElement('h2');
        mealName.textContent = meal.name;
        card.appendChild(mealName);

        const ingredients = document.createElement('p');
        ingredients.textContent = `Ingredients: ${meal.ingredients.join(', ')}`;
        card.appendChild(ingredients);

        const cost = document.createElement('p');
        cost.textContent = `Cost: $${meal.cost.toFixed(2)}`;
        card.appendChild(cost);

        const voteCount = document.createElement('p');
        voteCount.className = 'votes';
        voteCount.textContent = `Votes: ${meal.votes || 0}`;
        card.appendChild(voteCount);

        const voteButton = document.createElement('button');
        voteButton.textContent = 'Vote';
        voteButton.onclick = () => {
            const currentVotes = meal.votes || 0;
            mealRef.child(mealKey).update({ votes: currentVotes + 1 });
            voteCount.textContent = `Votes: ${currentVotes + 1}`;
        };
        card.appendChild(voteButton);

        mealContainer.appendChild(card);
    });
}).catch(error => {
    console.error("Error fetching meals:", error);
    mealContainer.innerHTML = "<p>Error loading meals. Please try again later.</p>";
});
