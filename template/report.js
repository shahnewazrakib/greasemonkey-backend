export const reportTemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Car Inspection Report</title>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.0/css/all.min.css"
      integrity="sha512-DxV+EoADOkOygM4IR9yXP8Sb2qwgidEmeqAEmDKIOfPRQZOWbXCzLC6vjbZyy0vPisbH2SyW27+ddLVCN+OMzQ=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />

    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        font-size: 13px;
        line-height: 150%;
      }

      /* Common style  */
      .page-break {
        page-break-before: always;
      }

      .container {
        padding: 0 40px;
      }

      .section-title {
        font-size: 18px;
        margin-bottom: 20px;
        margin-top: 0;
      }

      .section-title.center {
        text-align: center;
      }
      .heading-3 {
        font-size: 14px;
        margin-bottom: 5px;
        margin-top: 15px;
      }

      .heading-3.clear-margin {
        margin-bottom: 0;
        margin-top: 0;
      }

      .heading-3.center {
        text-align: center;
      }

      .paragraph {
        margin-bottom: 0;
        margin-top: 0;
      }

      .disclaimer-paragraph {
        font-size: 11px;
        line-height: 16px;
      }

      .paragraph.center {
        text-align: center;
      }

      a {
        color: #007bff;
        text-decoration: none;
      }

      .success-text {
        color: #16a34a;
      }
      .error-text {
        color: #ef4444;
      }
      .default-text {
        color: #71717a;
      }

      .badge {
        padding: 2px 10px;
        border-width: 1px;
        border-style: solid;
        border-radius: 5px;
      }

      .badge.success {
        color: #389e0d;
        border-color: #b7eb8f;
        background-color: #f6ffed;
      }
      .badge.error {
        color: #cf1322;
        border-color: #ffa39e;
        background-color: #fff1f0;
      }

      .badge.default {
        color: #000;
        border-color: #d9d9d9;
        background-color: #fafafa;
      }

      /* Hero styles  */
      .hero .hero-title {
        font-size: 24px;
        margin-bottom: 20px;
        font-weight: 600;
        margin-top: 0;
      }

      .hero .car-details {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 8px;
      }

      .hero .car-details p {
        margin: 0;
      }

      .hero .exterior-images {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px 20px;
        margin-top: 20px;
      }

      .hero .exterior-images img {
        width: 100%;
        height: auto;
        object-fit: cover;
        margin-bottom: 10px;
      }

      /* Inspection Summary styles  */
      .inspection-summary .overall-rating {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .inspection-summary .overall-rating h3 {
        margin-top: 0;
      }

      .inspection-summary .overall-rating h4 {
        font-size: 26px;
        font-weight: 300;
        margin-bottom: 10px;
        margin-top: 0;
      }

      .inspection-summary .overall-rating .stars {
        font-size: 18px;
        margin-bottom: 10px;
        color: #374151;
      }

      .inspection-summary .components-ratings {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
        margin-top: 20px;
      }

      .inspection-summary .components-ratings .card {
        border: 1px solid rgb(212, 212, 212);
        padding: 10px;
        border-radius: 10px;
      }

      .inspection-summary .components-ratings .card .title-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 5px;
      }

      .inspection-summary .components-ratings .card .stars {
        color: #374151;
        font-size: 10px;
      }

      /* Vehicle History Snapshot styles  */
      .history-snapshot .components {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .history-snapshot .card {
        border: 1px solid rgb(212, 212, 212);
        padding: 10px;
        border-radius: 10px;
        display: flex;
        justify-content: space-between;
        align-items: start;
      }

      .history-snapshot .card .inner-card {
        display: flex;
        gap: 10px;
      }

      .history-snapshot .card .icon {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        background: rgb(243, 243, 243);
        font-size: 15px;
      }

      /* Vehicle History Details styles  */
      .history-details .components {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .history-details .card {
        border: 1px solid rgb(212, 212, 212);
        padding: 10px;
        border-radius: 10px;
      }

      .history-details .card .title-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 5px;
      }

      .history-details .card .title-bar .title {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .history-details .card .title-bar .title i{
        font-size: 16px;
      }

      .history-details .card .details {
        display: flex;
        flex-direction: column;
        gap: 5px;
      }

      .history-details .card .images {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
        margin-top: 10px;
      }

      .history-details .card .images img {
        width: 100%;
        height: auto;
        object-fit: cover;
      }

      /* Inspector Comment  */
      .inspector-comment .inspector {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        margin-top: 20px;
      }

      .inspector-comment .inspector img {
        width: 45px;
      }

      .inspector-comment .inspector img.avatar {
        width: 35px;
        height: 35px;
        border-radius: 100%;
        object-fit: cover;
      }

      /* Poor Parts  */
      .poor-parts .components{
        display: flex;
        flex-direction: column;
        gap: 15px;
      }
      .poor-parts .components .parts {
        border: 1px solid #ffe1e0;
        background-color: #fff1f0;
        padding: 15px;
        border-radius: 10px;
      }

      .poor-parts .components .parts .rating {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .poor-parts .components .parts .rating .stars {
        color: #374151;
        font-size: 11px;
      }

      .poor-parts .components .parts .images {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
        margin-top: 10px;
      }

      .poor-parts .components .parts .images img {
        width: 100%;
        height: auto;
        object-fit: cover;
      }

      /* Inspection Result  */
      .inspection-results .components{
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      .inspection-results .components .component {
        border: 1px solid rgb(212, 212, 212);
        border-radius: 10px;
      }

      .inspection-results .components .component .title-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 15px;
        border-bottom: 1px solid rgb(212, 212, 212);
        background: #f9f9f9;
        border-radius: 10px 10px 0 0;
      }
      .inspection-results .components .component .title-bar .fa-star {
        color: #374151;
        font-size: 12px;
      }

      .inspection-results .components .component .parts{
        padding: 15px;
        border-bottom: 1px solid rgb(212, 212, 212);
      }

      .inspection-results .components .component .parts:last-of-type {
        border-bottom: none;
      }

      .inspection-results .components .component .parts .rating{
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .inspection-results .components .component .parts .rating .stars{
        color: #374151;
        font-size: 11px;
      }

      .inspection-results .components .component .parts .images {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
        margin-top: 10px;
      }

      .inspection-results .components .component .parts .images img {
        width: 100%;
        height: auto;
        object-fit: cover;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <!-- Hero area  -->
      <div class="hero">
        <h1 class="hero-title">Pre-purchase Car Inspection Report</h1>
        <div class="car-details">
          <div>
            <label>Make</label>
            <p><strong>{{make}}</strong></p>
          </div>
          <div>
            <label>Model</label>
            <p><strong>{{model}}</strong></p>
          </div>
          <div>
            <label>Model Year</label>
            <p><strong>{{year}}</strong></p>
          </div>
          <div>
            <label>Rego/Vin</label>
            <p><strong>{{vin}}</strong></p>
          </div>
          <div>
            <label>Odometer</label>
            <p><strong>{{odometer}}</strong></p>
          </div>
          <div>
            <label>Transmission</label>
            <p><strong>{{transmission}}</strong></p>
          </div>
          <div>
            <label>Fuel Type</label>
            <p><strong>{{fuelType}}</strong></p>
          </div>
          <div>
            <label>Inspection Date</label>
            <p><strong>{{inspectionDate}}</strong></p>
          </div>
        </div>

        {{exteriorImages}}
      </div>

      <!-- Vehicle History Snapshot  -->
      <div class="page-break history-snapshot">
        <h4 class="section-title">Vehicle History Snapshot</h4>
        {{historySnapshot}}
        <p class="disclaimer-paragraph">
          Information is sourced from the PPSR, third-party databases,
          diagnostic tools, and available service records at the time of
          inspection. Company uses advanced equipment to assess the
          vehicle, where applicable, at the time of inspection. While every
          effort is made, we do not guarantee the accuracy, completeness, or
          future condition of the vehicle.
        </p>
      </div>

      <!-- Inspection Summary  -->
      <div class="page-break inspection-summary">
        <h4 class="section-title center">Inspection Summary</h4>
        <div>
          <div class="overall-rating">
            <h3>Overall Rating</h3>
            <h4>{{overallRating}}/5.0</h4>
            <div class="stars">
              {{overallRatingStars}}
            </div>
            <p class="paragraph">
              <a href="#rating-guide"
                ><i class="fa-solid fa-circle-info"></i> Rating Guide</a
              >
            </p>
          </div>
        </div>

        <div class="components-ratings">
          {{componentsRatings}}
        </div>
      </div>

      <!-- Inspector Comment  -->
      <div class="page-break inspector-comment">
        <h4 class="section-title center">Inspector Comment</h4>
        <p class="paragraph center">
          {{inspectorComment}}
        </p>
        <div class="inspector">
          {{inspectorAvatar}}
          <div>
            <p class="paragraph"><strong>{{inspectorName}}</strong></p>
            <p class="paragraph">Inspector, Greasemonkey Inspectors</p>
          </div>
        </div>
      </div>

      <!-- Poor Parts-->
      {{poorParts}}

      <!-- Inspection Results  -->
      <div class="page-break inspection-results">
        <h4 class="section-title">Detailed Inspection Results</h4>
        
        <div class="components">
          {{inspectionResults}}
        </div>
      </div>

      <!-- Vehicle History Details -->
      {{vehicleHistoryDetails}}

      <!-- Rating Guide  -->
      <div class="page-break rating-guide" id="rating-guide">
        <h4 class="section-title">Rating Guide</h4>
        <div>
          <h5 class="heading-3">4.5 - 5.0 Very Good</h5>
          <p class="paragraph">
            The item is in optimal working condition with no apparent signs of
            damage or degradation, in line with the vehicle's age.
          </p>
          <h5 class="heading-3">3.5 - 4.0 Good</h5>
          <p class="paragraph">
            The item is functional with some signs of damage or wear and tear,
            appropriate for the vehicle's age.
          </p>
          <h5 class="heading-3">2.5 - 3.0 Fair</h5>
          <p class="paragraph">
            The item is operational but shows noticeable damage or wear and
            tear, consistent with the age of the vehicle.
          </p>
          <h5 class="heading-3">1.5 - 2.0 Poor</h5>
          <p class="paragraph">
            The item is not functioning properly or displays significant damage
            or wear and tear.
          </p>
          <h5 class="heading-3">0.5 - 1.0 Very Poor</h5>
          <p class="paragraph">
            The item is non-functional or shows severe signs of damage or
            excessive wear and tear.
          </p>
        </div>
      </div>

      <!-- Disclaimer  -->
      <div class="page-break disclaimer">
        <h4 class="section-title">Disclaimer</h4>
        <div>
          <h5 class="heading-3">Inspection Nature:</h5>
          <p class="paragraph">
            Company's vehicle inspections are purely visual and
            non-mechanical. No vehicle component disassembly will occur during
            the inspection. Despite using industry-recognized fault detection
            techniques, it is possible that not all vehicle faults will be
            identified. Our comprehensive inspection covers the vehicle's body,
            interior, exterior, electrical and engine systems, cooling, exhaust,
            braking, fuel, steering and suspension, safety, transmission, final
            drive systems, chassis, and understructure, and includes a road test
            where applicable.
          </p>

          <h5 class="heading-3">Limitation of Liability:</h5>
          <p class="paragraph">
            Company, and its inspectors are not accountable for identifying
            every defect, including those not visually evident during inspection
            or those that may occur post-inspection. Our report represents the
            vehicle's condition solely at the inspection time and date. It
            should not be mistaken for a roadworthy certificate, nor does it
            encompass manufacturer recall notices. The onus is on the buyer to
            visually assess the vehicle's condition at the point of sale.
          </p>

          <h5 class="heading-3">Non-Involvement in Transactions:</h5>
          <p class="paragraph">
            Company, its representatives, or any affiliated company shall
            bear no responsibility for any agreements, transactions, or
            discussions between parties concerning any vehicle inspected by us.
            Additionally, Company will not engage in mediating disputes
            arising from such transactions.
          </p>

          <h5 class="heading-3">No Warranty on Information:</h5>
          <p class="paragraph">
            Subject to applicable laws, Company offers no warranty,
            guarantee, or representation regarding the inspection report's
            accuracy, completeness, reliability, or suitability for any intended
            purpose. Users of the report agree that Company is not liable
            for any direct, indirect, incidental, or consequential damages or
            losses that may result from reliance on our report.
          </p>

          <h5 class="heading-3">Exclusion of Liability:</h5>
          <p class="paragraph">
            Company will not be liable for any loss of use, production,
            profit, revenue, data, or any anticipated savings, nor for any
            delays, increased operating costs, or any form of economic loss
            resulting directly or indirectly from the use of our inspection
            service or report. By engaging Company for vehicle inspection
            services, you acknowledge and accept these terms as part of our
            service agreement. For a detailed understanding of our services,
            please refer to our
            <a
              target="_blank"
              class=""
              href="#"
              >Terms and Conditions </a
            >.
          </p>

          <h5 class="heading-3">
            Information Sources and Accuracy Limitations:
          </h5>
          <p class="paragraph">
            Information is sourced from the PPSR, third-party databases,
            diagnostic tools, and available service records at the time of
            inspection. Company uses advanced equipment to assess the
            vehicle, where applicable, at the time of inspection. While every
            effort is made, we do not guarantee the accuracy, completeness, or
            future condition of the vehicle.
          </p>
        </div>
      </div>
    </div>
  </body>
</html>`;
