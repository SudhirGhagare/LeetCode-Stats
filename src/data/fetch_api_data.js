import axios from "axios"

const base_url = 'https://leetcode.com/graphql'

const get_user_profile_data = async() => {

    const body = {
        "operationName": "userPublicProfile",
        "query": "query userPublicProfile($username: String!) {\n  matchedUser(username: $username) {\n    contestBadge {\n      name\n      expired\n      hoverText\n      icon\n    }\n    username\n    githubUrl\n    twitterUrl\n    linkedinUrl\n    profile {\n      ranking\n      userAvatar\n      realName\n      aboutMe\n      school\n      websites\n      countryName\n      company\n      jobTitle\n      skillTags\n      postViewCount\n      postViewCountDiff\n      reputation\n      reputationDiff\n      solutionCount\n      solutionCountDiff\n      categoryDiscussCount\n      categoryDiscussCountDiff\n    }\n  }\n}",
        "variables": {
            "username": "Sudhir_Ghagare"
        }
    }
    const response = await axios.get(base_url,{body: body})
    
    return response
}