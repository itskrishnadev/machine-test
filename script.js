fetch("data.json").then(async (resp) => {
    const data = await resp.json();

    //for yearly and monthly tab
    // Show the first tab and hide the rest
    $("#tabs-nav li:first-child").addClass("active");
    $(".tab-content").hide();
    $(".tab-content:first").show();

    // Click function
    $("#tabs-nav li").click(function() {
        $("#tabs-nav li").removeClass("active");
        $(this).addClass("active");
        $(".tab-content").hide();

        var activeTab = $(this).find("a").attr("href");
        $(activeTab).fadeIn();
        return false;
    });

    //yearly section code

    var yearlyTOmap = data[1]["yearly"];
    //this is imp variable
    var allYearGrade = [];

    for (let i = 0; i < yearlyTOmap.length; i++) {
        const element = yearlyTOmap[i];
        allYearGrade.push(element);
    }

    if (allYearGrade.length > 0) {
        $.each(allYearGrade, function(key, value) {
            $("#yearly-grade").append(
                $(`<option class="yo-bro black">`, {
                    value: value.grade,
                }).text(value.grade)
            );
        });
    }

    console.log(allYearGrade);

    //selected option is first option
    //on first load i will take grade 6 as first default value
    renderYearlyBoards(allYearGrade[0]);
    updateValueInCourseDetails(allYearGrade[0]["boards"]["CBSE"]);
    addCourseSyllabus(allYearGrade[0]["boards"]["CBSE"]["syllabus"]);

    function renderYearlyBoards(obj) {
        var allBoards = obj["boards"];
        const container = document.getElementById("yeartabs-board");
        $("#yeartabs-board").empty();
        for (const key in allBoards) {
            const thistabs = allBoards[key];

            const content = `

        <li  class="boards-motn yearly-boars  f5-ns f6" >
                   ${key}
                  </li>



  `;

            // Append newyly created card element to the container

            container.innerHTML += content;
        }
        $("#yeartabs-board li:first-child").addClass("active");
    }
    //boards tabs

    //select on change function for grade select
    $("#yearly-grade").on("change", function() {
        for (let i = 0; i < allYearGrade.length; i++) {
            const element = allYearGrade[i];
            if (this.value && this.value === element.grade) {
                //render tabs
                renderYearlyBoards(element);

                renderYearlyInfo(element);
            }
        }
    });

    function renderYearlyInfo(obj) {
        console.log(obj);

        var allBoards = obj["boards"];
        const container = document.getElementById("yeartabs-board");
        $("#yeartabs-board").empty();
        for (const key in allBoards) {
            const thistabs = allBoards[key];

            const content = `

        <li  class="boards-motn yearly-boars  f5-ns f6" >
                   ${key}
                  </li>



  `;

            // Append newyly created card element to the container

            container.innerHTML += content;
        }
        $("#yeartabs-board li:first-child").addClass("active");
        updateValueInCourseDetails(obj["boards"]["CBSE"]);
        addCourseSyllabus(obj["boards"]["CBSE"]["syllabus"]);
    }

    function updateValueInCourseDetails(obj) {
        for (const key in obj) {
            $(`#${key}`).text(obj[key]);
        }
    }

    function addCourseSyllabus(string) {
        var array = string.split("!");
        //with above array map all the features
        const container = document.getElementById("all-syllabus");
        $("#all-syllabus").empty();
        for (let j = 0; j < array.length; j++) {
            const element = array[j];
            let color = j > 2 ? "white" : "#f0c650";
            const content = `

<p class="mt0 mb1 fw6 f6 white fl w-third-ns w-50 pr3-m " style="color:${color}" >
          ${element}
          </p>
      
   

  `;

            // Append newyly created card element to the container

            container.innerHTML += content;
        }
    }

    //change the data accroding to selected grade
    $("#yeartabs-board").on("click", ".yearly-boars", function(event) {
        $("#yeartabs-board li").removeClass("active");
        $(this).addClass("active");
        var text = $(event.target).text();
        var value = text.trim();
        //get selected grade
        var selectedGrade = $("#yearly-grade").val();

        for (let i = 0; i < allYearGrade.length; i++) {
            const element = allYearGrade[i];

            if (selectedGrade === element.grade) {
                var boardwillbe = element["boards"][value];
                updateValueInCourseDetails(boardwillbe);
                addCourseSyllabus(boardwillbe["syllabus"]);
            }
        }
    });

    //tag course details section 1 in

    //***************************monthly tab section code**********************************//

    //list all the select dropdown for the grade from array montly obj

    //map grade select Option
    var arryTOmap = data[0]["monthly"];

    var allmothlyGrade = [];

    for (let i = 0; i < arryTOmap.length; i++) {
        const element = arryTOmap[i];
        allmothlyGrade.push(element);
    }

    if (allmothlyGrade.length > 0) {
        $.each(allmothlyGrade, function(key, value) {
            $("#mySelect").append(
                $(`<option class="yo-bro">`, {
                    value: value.grade,
                }).text(value.grade)
            );
        });
    }

    //selected tab reder rows
    //default will be six one
    const apiResult = allmothlyGrade[0]["boards"]["general"];
    renderMonthlyCardsFunction(apiResult);

    function renderMonthlyCardsFunction(myValue) {
        const container = document.getElementById("monthly-rows");
        $("#monthly-rows").empty();

        for (const key in myValue) {
            const element = myValue[key];

            // const card = document.createElement("div");
            // card.classList = "card-body";

            const content = `
    <div class="plans pv3 mv3">
  <div class=" row-monthlysdj cf">
  <div class="for-mobile">
                    <div
                      class="select-radio fl  flex justify-center items-center"
                    >
                      <div class="custom_radio">
                        <input
                          type="radio"
                          name="radio-group"
                        />
                        <label></label>
                      </div>
                    </div>
                    <div class="for-sdkk">
                    <div class="month-det same-we white">
                      <h2 class="ma0 fw7 pr-t">${element.valid}</h2>
                      <p class="ma0 fw6 sub-tx pt1">
                        ${element.refund}
                      </p>
                    </div>

                    <div class="price-det same-we  price-w white">
                      <h2 class="ma0 fw7 pr-t">
                        ${calculatePrice(element.price, element.discount)}
                        <span class="cross-price pl2"> ₹  ${
                          element.price
                        }</span>
                      </h2>
                      <p class="ma0 fw8 sub-tx pt1 offper-bg">
                        ${element.discount}% OFF
                      </p>
                    </div>

                    <div class="perSession-det  perSession-w white">
                      <h2 class="ma0 fw7 pr-t">  ${
                        element.per_class_price
                      } per session</h2>
                      <p class="ma0 fw6 sub-tx pt1"> ${
                        element.total_sessions
                      } Sessions</p>
                    </div>
                    </div>
                  </div>
                  </div>
                  </div>



  `;

            // Append newyly created card element to the container

            container.innerHTML += content;
        }
    }

    //select on change function for grade select
    $("#mySelect").on("change", function() {
        for (let i = 0; i < allmothlyGrade.length; i++) {
            const element = allmothlyGrade[i];
            if (this.value && this.value === element.grade) {
                const general = element["boards"]["general"];
                //if not general other boards exists then
                if (!general) {
                    const boards = element["boards"]["CBSE"];

                    //add bords tabs
                    const allBoards = element["boards"];
                    const container = document.getElementById("mothlybords");
                    $("#mothlybords").empty();
                    for (const key in allBoards) {
                        const thistabs = allBoards[key];

                        const content = `

        <li  class="boards-motn" >
                   ${key}
                  </li>



  `;

                        // Append newyly created card element to the container

                        container.innerHTML += content;
                    }

                    $("#mothlybords li:first-child").addClass("active");

                    renderMonthlyCardsFunction(boards);
                } else {
                    $("#mothlybords").empty();
                    renderMonthlyCardsFunction(general);
                }
            }
        }
    });

    //change the data accroding to selected grade
    $("#mothlybords").on("click", ".boards-motn", function(event) {
        $("#mothlybords li").removeClass("active");
        $(this).addClass("active");
        var text = $(event.target).text();
        var value = text.trim();
        //get selected grade
        var selectedGrade = $("#mySelect").val();

        for (let i = 0; i < allmothlyGrade.length; i++) {
            const element = allmothlyGrade[i];
            if (selectedGrade === element.grade) {
                var boardwillbe = element["boards"][value];

                renderMonthlyCardsFunction(boardwillbe);
            }
        }
    });

    function monthtabClicked(params) {
        console.log(params);
    }

    function calculatePrice(price, percentage) {
        var numVal1 = price;
        var numVal2 = percentage / 100;
        var totalValue = numVal1 - numVal1 * numVal2;
        return totalValue.toFixed(0);
    }

    //if selected active then
});