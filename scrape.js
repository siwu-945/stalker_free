const username = "YOUR_USER_NAME";

const today = new Date();
const day = String(today.getDate()).padStart(2, '0');
const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
const year = today.getFullYear();

const downloadDate = `${year}_${month}_${day}`;

let followers = [];
let dontFollowMeBack = [];


function arrayToCSV(data) {
    const header = Object.keys(data[0]).join(","); 
    const rows = data.map(row => Object.values(row).join(",")); 
    return [header, ...rows].join("\n"); 
  }

function downloadCSV(filename, data) {
    const blob = new Blob([data], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

(async () => {
  try {
    console.log(`Process started! Give it a couple of seconds`);

    const userQueryRes = await fetch(
      `https://www.instagram.com/web/search/topsearch/?query=${username}`
    );

    const userQueryJson = await userQueryRes.json();

    const userId = userQueryJson.users.map(u => u.user)
                                      .filter(
                                        u => u.username === username
                                       )[0].pk;

    let after = null;
    let has_next = true;

    while (has_next) {
      await fetch(
        `https://www.instagram.com/graphql/query/?query_hash=c76146de99bb02f6415203be841dd25a&variables=` +
          encodeURIComponent(
            JSON.stringify({
              id: userId,
              include_reel: true,
              fetch_mutual: true,
              first: 50,
              after: after,
            })
          )
      )
        .then((res) => res.json())
        .then((res) => {
          has_next = res.data.user.edge_followed_by.page_info.has_next_page;
          after = res.data.user.edge_followed_by.page_info.end_cursor;
          followers = followers.concat(
            res.data.user.edge_followed_by.edges.map(({ node }) => {
              return {
                username: node.username,
                full_name: node.full_name,
              };
            })
          );
        });
    }

    console.log("Followers fetched!");
    downloadCSV(downloadDate + "_followers.csv", arrayToCSV(followers));
    
    // after = null;
    // has_next = true;
    // while (has_next) {
    //     await fetch(
    //       `https://www.instagram.com/graphql/query/?query_hash=d04b0a864b4b54837c0d870b0e77e076&variables=` +
    //         encodeURIComponent(
    //           JSON.stringify({
    //             id: userId,
    //             include_reel: true,
    //             fetch_mutual: true,
    //             first: 50,
    //             after: after,
    //           })
    //         )
    //     )
    //       .then((res) => res.json())
    //       .then((res) => {
    //         has_next = res.data.user.edge_follow.page_info.has_next_page;
    //         after = res.data.user.edge_follow.page_info.end_cursor;
    //         followings = followings.concat(
    //           res.data.user.edge_follow.edges.map(({ node }) => {
    //             return {
    //               username: node.username,
    //               full_name: node.full_name,
    //             };
    //           })
    //         );
    //       });
    //   }
  
    //   console.log(`Followings fetched: ${followings.length}`);
  
    //   dontFollowMeBack = followings.filter((following) => {
    //     return !followers.find(
    //       (follower) => follower.username === following.username
    //     );
    //   });

    // downloadCSV(downloadDate + "_dontFollowBack.csv", arrayToCSV(followers));

    // console.log(
    //   `Process is done: Type 'copy(followers)' or 'copy(followings)' or 'copy(dontFollowMeBack)' or 'copy(iDontFollowBack)' in the console and paste it into a text editor to take a look at it'`
    // );
  } catch (err) {
    console.log({ err });
  }
})();