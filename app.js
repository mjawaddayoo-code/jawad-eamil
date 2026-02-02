var myBookedEmail = localStorage.getItem("booked_email");
      if (myBookedEmail) {
        document.getElementById("booked_email_address").innerText =
          myBookedEmail;
      }
      document
        .getElementById("custom_domain_form")
        .addEventListener("submit", (e) => {
          e.preventDefault();

          let customDomain = document.getElementById("custom_domain").value;
          customDomain += "@catchmail.io";

          let api = `https://api.codetabs.com/v1/proxy?quest=`;
          api += `https://api.catchmail.io/api/v1/mailbox?address=${customDomain}`;

          console.log(api);

          fetch(api)
            .then((res) => res.json())
            .then((resp) => {
              document.getElementById("booked_email_address").innerText =
                customDomain;
              localStorage.setItem("booked_email", customDomain);

              let allEmails = resp.messages;
              let rows = "";
              for (let i = 0; i < allEmails.length; i++) {
                rows += `<li>${allEmails[i].id} | ${allEmails[i].from} | ${allEmails[i].subject} | <button onclick="openMyEmail('${allEmails[i].id}')">View Email</button></li>`;
              }
              document.getElementById("list").innerHTML = rows;
            });
        });

      function openMyEmail(eid) {
        console.log(eid);

        let api = `https://api.codetabs.com/v1/proxy?quest=https://api.catchmail.io/api/v1/message/${eid}?mailbox=${myBookedEmail}`;
        fetch(api)
          .then((res) => res.json())
          .then((resp) => {
            console.log(resp);

            document.getElementById("currentEmail").innerHTML = resp.body.html;
          });
      }