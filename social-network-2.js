


var data = {
  f01: {
    name: "Alice",
    age: 15,
    follows: ["f02", "f03", "f04"]
  },
  f02: {
    name: "Bob",
    age: 20,
    follows: ["f05", "f06"]
  },
  f03: {
    name: "Charlie",
    age: 35,
    follows: ["f01", "f04", "f06"]
  },
  f04: {
    name: "Debbie",
    age: 40,
    follows: ["f01", "f02", "f03", "f05", "f06"]
  },
  f05: {
    name: "Elizabeth",
    age: 45,
    follows: ["f04"]
  },
  f06: {
    name: "Finn",
    age: 25,
    follows: ["f05"]
  }
};

var ListNamesAndWhoTheyFollowAndTheirFollowers = function (arrayOfMembers) {

  for (var i = 0; i < arrayOfMembers.length; i++) {
    console.log("---------");
    console.log("Member ID: " + arrayOfMembers[i]["memberID"]);
    console.log("Name: " + arrayOfMembers[i]["name"]);
    console.log("Follows: " + arrayOfMembers[i]["follows"]);
    console.log("Followers: " + arrayOfMembers[i]["followers"]);
    console.log("---------");
  }

}

var listEveryone = function() {
  var arrayOfMembers = []

  for (var socialMember in data) {
    if(data.hasOwnProperty(socialMember)) {
      var socialMemberObjectinFormat = getSocialMemberObjectinFormat(socialMember);
      arrayOfMembers.push(socialMemberObjectinFormat);
    }
  }

  console.log("List of everyone inlcuding their follows and who follows them: ")

  ListNamesAndWhoTheyFollowAndTheirFollowers(arrayOfMembers);

}

var getNumberOfFollows = function (dataID) {
  var numberOfFollows = data[dataID]["follows"].length;
  return numberOfFollows;

}

var getSocialMemberObject = function(dataID) {
  return data[dataID];
}

var getSocialMemberObjectinFormat = function(dataID) {
  var socialMemberObjectinFormat = {};
  socialMemberObjectinFormat = {
    "memberID": dataID,
    "name": data[dataID]["name"],
    "follows": data[dataID]["follows"],
    "followers": getFollowers(dataID)
  }

  return socialMemberObjectinFormat;

}

var getFollowers = function(dataID) {
  var followersList = [];

  for (var socialMember in data) {
    if(data.hasOwnProperty(socialMember)) {
      var socialMemberObject = getSocialMemberObject(socialMember);
      if(socialMemberObject["follows"].indexOf(dataID) > -1) followersList.push(socialMember);
    }
  }

  return followersList;
}

var getNumberOfFollowers = function(dataID) {
  var numberofFollowers = 0;

  for (var socialMember in data) {
    if(data.hasOwnProperty(socialMember)) {
      var socialMemberObject = getSocialMemberObject(socialMember);
          if(socialMemberObject["follows"].indexOf(dataID) > -1) numberofFollowers++;
        }
      }
  return numberofFollowers;
}



var identifyWhoFollowsTheMostPeople = function (ageRestriction) {

  var membersWithMostNumberOfFollows = [];
  var mostNumberOfFollows = 0;

  if (ageRestriction === undefined) {
    for (var socialMember in data) {
      if(data.hasOwnProperty(socialMember)) {
        if (getNumberOfFollows(socialMember) > mostNumberOfFollows) {
          membersWithMostNumberOfFollows = [];
          membersWithMostNumberOfFollows.push(getSocialMemberObjectinFormat(socialMember));
          mostNumberOfFollows = getNumberOfFollows(socialMember);
        }

        else if (getNumberOfFollows(socialMember) === mostNumberOfFollows) {
          membersWithMostNumberOfFollows.push(getSocialMemberObjectinFormat(socialMember));
        }

      }
    }

  console.log("Social Member(s) with the most follows: ");

  } else {
      for (var socialMember in data) {
        if(data.hasOwnProperty(socialMember)) {
          if (getSocialMemberObject(socialMember)["age"] > ageRestriction) {
            if (getNumberOfFollows(socialMember) > mostNumberOfFollows) {
              membersWithMostNumberOfFollows = [];
              membersWithMostNumberOfFollows.push(getSocialMemberObjectinFormat(socialMember));
              mostNumberOfFollows = getNumberOfFollows(socialMember);
            }

            else if (getNumberOfFollows(socialMember) === mostNumberOfFollows) {
              membersWithMostNumberOfFollows.push(getSocialMemberObjectinFormat(socialMember));
            }
          }
        }
      }

    console.log("Social Member(s) over the age of " + ageRestriction + " with the most number of follows: ")
  }

  ListNamesAndWhoTheyFollowAndTheirFollowers(membersWithMostNumberOfFollows);

}

var identifyWhoHasTheMostFollowers = function (ageRestriction) {
  var membersWithMostNumberOfFollowers = [];
  var mostNumberOfFollowers = 0;

  if (ageRestriction === undefined) {
    for (var socialMember in data) {
      if(data.hasOwnProperty(socialMember)) {
        if(getNumberOfFollowers(socialMember) > mostNumberOfFollowers) {
          membersWithMostNumberOfFollowers = [];
          membersWithMostNumberOfFollowers.push(getSocialMemberObjectinFormat(socialMember));
          mostNumberOfFollowers = getNumberOfFollowers(socialMember);
        }
         else if (getNumberOfFollowers(socialMember) === mostNumberOfFollowers) {
          membersWithMostNumberOfFollowers.push(getSocialMemberObjectinFormat(socialMember));
         }
      }
    }

    console.log("Social media member(s) with the most number of followers: ");
  } else {
    for (var socialMember in data) {
      if (data.hasOwnProperty(socialMember)) {
        if (getSocialMemberObject(socialMember)["age"] > ageRestriction) {
          if (getNumberOfFollowers(socialMember) > mostNumberOfFollowers) {
            membersWithMostNumberOfFollowers = [];
            membersWithMostNumberOfFollowers.push(getSocialMemberObjectinFormat(socialMember));
            mostNumberOfFollowers = getNumberOfFollowers(socialMember);
          }

          else if (getNumberOfFollowers(socialMember) === mostNumberOfFollowers) {
            membersWithMostNumberOfFollowers.push(getSocialMemberObjectinFormat(socialMember));
          }
        }
      }
    }

    console.log("Social Member(s) over the age of " + ageRestriction + " with the most number of followers: ");
  }

  ListNamesAndWhoTheyFollowAndTheirFollowers(membersWithMostNumberOfFollowers);
}

var identifyThoseWhoFollowSomeoneThatDontFollowThemBack = function() {
  var membersWhoFollowSomeoneThatDontFollowThemBack = [];
  var memebrsWhoExistinReturnArray = [];

  for (var socialMember in data) {
    if (data.hasOwnProperty(socialMember)) {
      for (var i = 0; i < getSocialMemberObject(socialMember)["follows"].length; i++) {
        if (!getSocialMemberObject(getSocialMemberObject(socialMember)["follows"][i])["follows"].includes(socialMember)) {
          if (!memebrsWhoExistinReturnArray.includes(socialMember)) {
            membersWhoFollowSomeoneThatDontFollowThemBack.push(getSocialMemberObjectinFormat(socialMember));
            memebrsWhoExistinReturnArray.push(socialMember);
          }
        }
      }
    }
  }

  console.log("Social Member(s) who follow people who don't follow them back: ");

  ListNamesAndWhoTheyFollowAndTheirFollowers(membersWhoFollowSomeoneThatDontFollowThemBack);

}

var identifyEveryonesReach = function() {
  var identifyEveryonesReach = {};
  var followersListObject = {};


  for (var socialMember in data) {
    if(data.hasOwnProperty(socialMember)) {
      followersListObject[socialMember] = getFollowers(socialMember);
    }
  }

  for (var socialMember in data) {
    if(data.hasOwnProperty(socialMember)) {
        var reach = 0;
        var reachUniqueArray = [];
        reach = getNumberOfFollowers(socialMember);
        reachUniqueArray = getFollowers(socialMember);
        for (var i=0; i<getFollowers(socialMember).length; i++) {
         for (var j=0; j<getFollowers(getFollowers(socialMember)[i]).length; j++) {
            if ( (getFollowers(getFollowers(socialMember)[i])[j]!==socialMember) && (!reachUniqueArray.includes(getFollowers(getFollowers(socialMember)[i])[j]))) {
             reachUniqueArray.push(getFollowers(getFollowers(socialMember)[i])[j]);
             reach += 1;
            }
        }
    }
    identifyEveryonesReach[socialMember] = reach;
  }
}
  console.log("List of Social Members and their reach (i.e. total of their unique followers and the followers of their followers and not including the social member): ");
  console.log(identifyEveryonesReach);

}

listEveryone();
identifyWhoFollowsTheMostPeople();
identifyWhoFollowsTheMostPeople(30);
identifyWhoHasTheMostFollowers();
identifyWhoHasTheMostFollowers(30);
identifyThoseWhoFollowSomeoneThatDontFollowThemBack();
identifyEveryonesReach();










