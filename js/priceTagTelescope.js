//------This script written by M.Shanab April 2023 ------//
//------Feel free to update this script ------//
//------Regards -----ephedrine2010@gmail.com ------//
$(document).ready(function() {
    processUrlText();
  });
  
  const items = [];

    async function processUrlText(){
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);

      const text= urlParams.get('text');
      //text="9708*1*5";
      var receivedData=text.split("*");
      //console.log(receivedData);
      receivedData[2]=parseInt(receivedData[2])+1;
      let category_name= getCategoryName(parseInt(receivedData[1]));

      for(let i=0;i<receivedData[2];i++){
        items.push({
          standCode: receivedData[0].toString()+receivedData[1].toString()+generateRandomNumber(1000,9999).toString(),
          stand_category:category_name,
        });
        
      }

      //Generate QRCODE
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        let qrCode = await generateQRCode(item.standCode);
        item.standqr = qrCode;
        //console.log(item.standqr);
      }
      //console.log(items);
          items.pop();
        
          

      const outputDiv = document.getElementById("output");
      items.forEach(item => {
        //console.log(item.item_barcode);
        outputDiv.innerHTML += createHTML(item);
      });

      
    }
    //-------------------------------------------------
    function generateRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    //-------------------------------------------------
     // generate QR code for item ID
     async function generateQRCode(itemID) {
      try {
        const qrDiv = document.createElement("div");
        new QRCode(qrDiv, {
          text: itemID,
          width: 100,
          height: 100
        });
        const canvas = qrDiv.querySelector("canvas");
        const dataURL = canvas.toDataURL();
        //console.log(dataURL); // Log the data URL to the console
        return dataURL;
      } catch (error) {
        console.log(error);
        return "";
      }
    }
    //-------------------------------------------------

  
      function getCategoryName(catNo) {
        switch (catNo) {
          case 1:
            return "Beauty";
          case 2:
            return "Personal Care";
          case 3:
            return "Medicine";
          case 4:
            return "Mom Baby";
          case 5:
            return "Wellness";
          case 6:
            return "BackStore";
          // ... other cases
          default:
            return "Invalid category";
        }
      }
      //price template function
      function createHTML(item) {
        return`
          <!-- template 3 -->
          <div class="qrBoxtemp m-1">
            <center>
                <table class=" align-self-auto" style="-webkit-transform:translate(0,7px)">
                    <tbody>
                        <tr>
                            <td rowspan="4" class="text-center">
                                <img src="${item.standqr}" alt="qrocde" style="height:70px ; width:70px" />
                            </td>
                        </tr>
                        <tr>
                            <td class="text-center">
                                <h1 class="h5 mb-0 text-gray-800" style="min-width:130px;">
                                  ${item.stand_category}
                                </h1>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-center">
                                <h1 class="h5 mb-0 text-gray-800">
                                  ${item.standCode}
                                </h1>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </center>
          </div>
  
          `
      }
        