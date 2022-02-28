
const objects = {
    API_URL: "http://192.168.0.12:3333/api/1.0.0",
    friends: [
        {
            "user_id": 8,
            "user_givenname": "Mayor",
            "user_familyname": "Luke",
            "user_email": "mayor.luke@mmu.ac.uk"
        },
        {
            "user_id": 9,
            "user_givenname": "James",
            "user_familyname": "Harden",
            "user_email": "mayor.luke@mmu.ac.uk"
        },
        {
            "user_id": 10,
            "user_givenname": "Gabe",
            "user_familyname": "Alexander",
            "user_email": "mayor.luke@mmu.ac.uk"
        },
        {
            "user_id": 11,
            "user_givenname": "Mitchell",
            "user_familyname": "Fiyori",
            "user_email": "mayor.luke@mmu.ac.uk"
        },
        {
            "user_id": 12,
            "user_givenname": "Control",
            "user_familyname": "Room",
            "user_email": "mayor.luke@mmu.ac.uk"
        },
    ],
    posts: [
        {
            "post_id": 9,
            "text": "Welcome to Spacebook. It's great to see you here :)",
            "timestamp": "2022-02-26T08:49:22.000Z",
            "author": {
                "user_id": 12,
                "first_name": "Mayor",
                "last_name": "Luke",
                "email": "mayor.luke@mmu.ac.uk"
            },
            "numLikes": 0
        },
        {
            "post_id": 10,
            "text": "The quick brown fox jumped over the lazy dogs",
            "timestamp": "2022-02-26T08:50:27.000Z",
            "author": {
                "user_id": 12,
                "first_name": "Mayor",
                "last_name": "Luke",
                "email": "mayor.luke@mmu.ac.uk"
            },
            "numLikes": 0
        }
    ],
}

export default objects;