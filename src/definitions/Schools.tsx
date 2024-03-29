type schoolType = { value: string, label: string };

const Schools : schoolType[] = [
    { value: "Abraham Baldwin Agricultural College", label: "Abraham Baldwin Agricultural College" },
    { value: "Albany Medical College", label: "Albany Medical College" },
    { value: "Albany State University", label: "Albany State University" },
    { value: "Amrita University", label: "Amrita University" },
    { value: "Arizona State University", label: "Arizona State University" },
    { value: "Armstrong State University", label: "Armstrong State University" },
    { value: "Atlanta Metropolitan State College", label: "Atlanta Metropolitan State College" },
    { value: "Auburn University", label: "Auburn University" },
    { value: "Augusta University", label: "Augusta University" },
    { value: "Bainbridge State College", label: "Bainbridge State College" },
    { value: "Baylor College of Medicine", label: "Baylor College of Medicine" },
    { value: "Baylor University", label: "Baylor University" },
    { value: "Berry College", label: "Berry College" },
    { value: "Binghamton University", label: "Binghamton University" },
    { value: "Boston College", label: "Boston College" },
    { value: "Boston University", label: "Boston University" },
    { value: "Bowling Green State University", label: "Bowling Green State University" },
    { value: "Brandeis University", label: "Brandeis University" },
    { value: "Brigham Young University", label: "Brigham Young University" },
    { value: "Brown University", label: "Brown University" },
    { value: "California Institute of Technology", label: "California Institute of Technology" },
    { value: "California State University, East Bay", label: "California State University, East Bay" },
    { value: "Carnegie Mellon University", label: "Carnegie Mellon University" },
    { value: "Case Western Reserve University", label: "Case Western Reserve University" },
    { value: "City College of New York", label: "City College of New York" },
    { value: "Clark Atlanta University", label: "Clark Atlanta University" },
    { value: "Clarkson University", label: "Clarkson University" },
    { value: "Clayton State University", label: "Clayton State University" },
    { value: "Clemson University", label: "Clemson University" },
    { value: "College of Coastal Georgia", label: "College of Coastal Georgia" },
    { value: "College of William and Mary", label: "College of William and Mary" },
    { value: "Colorado School of Mines", label: "Colorado School of Mines" },
    { value: "Colorado State University", label: "Colorado State University" },
    { value: "Columbia University", label: "Columbia University" },
    { value: "Columbus State University", label: "Columbus State University" },
    { value: "Cornell University", label: "Cornell University" },
    { value: "Creighton University", label: "Creighton University" },
    { value: "Dalton State College", label: "Dalton State College" },
    { value: "Dartmouth College", label: "Dartmouth College" },
    { value: "Darton State College", label: "Darton State College" },
    { value: "Drexel University", label: "Drexel University" },
    { value: "Duke University", label: "Duke University" },
    { value: "East Carolina University", label: "East Carolina University" },
    { value: "East Georgia State College", label: "East Georgia State College" },
    { value: "Emory University", label: "Emory University" },
    { value: "Florida Atlantic University", label: "Florida Atlantic University" },
    { value: "Florida Institute of Technology", label: "Florida Institute of Technology" },
    { value: "Florida International University", label: "Florida International University" },
    { value: "Florida State University", label: "Florida State University" },
    { value: "Fort Valley State University", label: "Fort Valley State University" },
    { value: "George Mason University", label: "George Mason University" },
    { value: "George Washington University", label: "George Washington University" },
    { value: "Georgetown University", label: "Georgetown University" },
    { value: "Georgia College & State University", label: "Georgia College & State University" },
    { value: "Georgia Gwinnett College", label: "Georgia Gwinnett College" },
    { value: "Georgia Highlands College", label: "Georgia Highlands College" },
    { value: "Georgia Institute of Technology", label: "Georgia Institute of Technology" },
    { value: "Georgia Southern University", label: "Georgia Southern University" },
    { value: "Georgia Southwestern State University", label: "Georgia Southwestern State University" },
    { value: "Georgia State University", label: "Georgia State University" },
    { value: "Gordon State College", label: "Gordon State College" },
    { value: "Harvard University", label: "Harvard University" },
    { value: "Harvey Mudd College", label: "Harvey Mudd College" },
    { value: "Howard University", label: "Howard University" },
    { value: "Hunter College", label: "Hunter College" },
    { value: "Icahn School of Medicine at Mount Sinai", label: "Icahn School of Medicine at Mount Sinai" },
    { value: "Illinois Institute of Technology", label: "Illinois Institute of Technology" },
    { value: "Indiana University - Bloomington", label: "Indiana University - Bloomington" },
    { value: "Indiana University-Purdue University Indianapolis", label: "Indiana University-Purdue University Indianapolis" },
    { value: "Iowa State University", label: "Iowa State University" },
    { value: "Johns Hopkins University", label: "Johns Hopkins University" },
    { value: "Kansas State University", label: "Kansas State University" },
    { value: "Kennesaw State University", label: "Kennesaw State University" },
    { value: "Kent State University", label: "Kent State University" },
    { value: "Knox College", label: "Knox College" },
    { value: "Lehigh University", label: "Lehigh University" },
    { value: "Loma Linda University", label: "Loma Linda University" },
    { value: "Louisiana State University", label: "Louisiana State University" },
    { value: "Louisiana Tech University", label: "Louisiana Tech University" },
    { value: "Loyola University Chicago", label: "Loyola University Chicago" },
    { value: "Marquette University", label: "Marquette University" },
    { value: "Massachusetts Institute of Technology", label: "Massachusetts Institute of Technology" },
    { value: "Medical College of Wisconsin", label: "Medical College of Wisconsin" },
    { value: "Medical University of South Carolina", label: "Medical University of South Carolina" },
    { value: "Miami University", label: "Miami University" },
    { value: "Michigan State University", label: "Michigan State University" },
    { value: "Michigan Technological University", label: "Michigan Technological University" },
    { value: "Middle Georgia State University", label: "Middle Georgia State University" },
    { value: "Mississippi State University", label: "Mississippi State University" },
    { value: "Missouri University of Science and Technology", label: "Missouri University of Science and Technology" },
    { value: "Montana State University", label: "Montana State University" },
    { value: "Morehouse College", label: "Morehouse College" },
    { value: "New Jersey Institute of Technology", label: "New Jersey Institute of Technology" },
    { value: "New Mexico State University", label: "New Mexico State University" },
    { value: "New York Medical College", label: "New York Medical College" },
    { value: "New York University", label: "New York University" },
    { value: "North Carolina State University", label: "North Carolina State University" },
    { value: "North Dakota State University", label: "North Dakota State University" },
    { value: "Northeastern University", label: "Northeastern University" },
    { value: "Northern Arizona University", label: "Northern Arizona University" },
    { value: "Northern Illinois University", label: "Northern Illinois University" },
    { value: "Northwestern University", label: "Northwestern University" },
    { value: "Oakland University", label: "Oakland University" },
    { value: "Ohio State University", label: "Ohio State University" },
    { value: "Ohio University", label: "Ohio University" },
    { value: "Oklahoma State University", label: "Oklahoma State University" },
    { value: "Old Dominion University", label: "Old Dominion University" },
    { value: "Oregon Health & Science University", label: "Oregon Health & Science University" },
    { value: "Oregon State University", label: "Oregon State University" },
    { value: "Pennsylvania State University", label: "Pennsylvania State University" },
    { value: "Portland State University", label: "Portland State University" },
    { value: "Princeton University", label: "Princeton University" },
    { value: "Purdue University", label: "Purdue University" },
    { value: "Queens College, City University of New York", label: "Queens College, City University of New York" },
    { value: "Rensselaer Polytechnic Institute", label: "Rensselaer Polytechnic Institute" },
    { value: "Rice University", label: "Rice University" },
    { value: "Rochester Institute of Technology", label: "Rochester Institute of Technology" },
    { value: "Rockefeller University", label: "Rockefeller University" },
    { value: "Rush University", label: "Rush University" },
    { value: "Rutgers University", label: "Rutgers University" },
    { value: "Saint Louis University", label: "Saint Louis University" },
    { value: "San Diego State University", label: "San Diego State University" },
    { value: "San Francisco State University", label: "San Francisco State University" },
    { value: "Savannah College of Art and Design", label: "Savannah College of Art and Design" },
    { value: "Savannah State University", label: "Savannah State University" },
    { value: "South Georgia State College", label: "South Georgia State College" },
    { value: "Southern Illinois University Carbondale", label: "Southern Illinois University Carbondale" },
    { value: "Southern Methodist University", label: "Southern Methodist University" },
    { value: "Spelman College", label: "Spelman College" },
    { value: "Stanford University", label: "Stanford University" },
    { value: "Stony Brook University", label: "Stony Brook University" },
    { value: "Syracuse University", label: "Syracuse University" },
    { value: "Temple University", label: "Temple University" },
    { value: "Texas A&M University", label: "Texas A&M University" },
    { value: "Texas Tech University", label: "Texas Tech University" },
    { value: "The Catholic University of America", label: "The Catholic University of America" },
    { value: "Thomas Jefferson University", label: "Thomas Jefferson University" },
    { value: "Tufts University", label: "Tufts University" },
    { value: "Tulane University", label: "Tulane University" },
    { value: "Uniformed Services University of the Health Sciences", label: "Uniformed Services University of the Health Sciences" },
    { value: "University at Albany, SUNY", label: "University at Albany, SUNY" },
    { value: "University at Buffalo", label: "University at Buffalo" },
    { value: "University of Akron", label: "University of Akron" },
    { value: "University of Alabama - Tuscaloosa", label: "University of Alabama - Tuscaloosa" },
    { value: "University of Alabama at Birmingham", label: "University of Alabama at Birmingham" },
    { value: "University of Alabama in Huntsville", label: "University of Alabama in Huntsville" },
    { value: "University of Alaska Fairbanks", label: "University of Alaska Fairbanks" },
    { value: "University of Arizona", label: "University of Arizona" },
    { value: "University of Arkansas - Fayetteville", label: "University of Arkansas - Fayetteville" },
    { value: "University of British Columbia", label: "University of British Columbia" },
    { value: "University of California, Berkeley", label: "University of California, Berkeley" },
    { value: "University of California, Davis", label: "University of California, Davis" },
    { value: "University of California, Irvine", label: "University of California, Irvine" },
    { value: "University of California, Los Angeles", label: "University of California, Los Angeles" },
    { value: "University of California, Merced", label: "University of California, Merced" },
    { value: "University of California, Riverside", label: "University of California, Riverside" },
    { value: "University of California, San Diego", label: "University of California, San Diego" },
    { value: "University of California, San Francisco", label: "University of California, San Francisco" },
    { value: "University of California, Santa Barbara", label: "University of California, Santa Barbara" },
    { value: "University of California, Santa Cruz", label: "University of California, Santa Cruz" },
    { value: "University of Central Florida", label: "University of Central Florida" },
    { value: "University of Chicago", label: "University of Chicago" },
    { value: "University of Cincinnati", label: "University of Cincinnati" },
    { value: "University of Colorado Boulder", label: "University of Colorado Boulder" },
    { value: "University of Connecticut", label: "University of Connecticut" },
    { value: "University of Dayton", label: "University of Dayton" },
    { value: "University of Delaware", label: "University of Delaware" },
    { value: "University of Denver", label: "University of Denver" },
    { value: "University of Florida", label: "University of Florida" },
    { value: "University of Georgia", label: "University of Georgia" },
    { value: "University of Hawaii at Manoa", label: "University of Hawaii at Manoa" },
    { value: "University of Houston", label: "University of Houston" },
    { value: "University of Idaho", label: "University of Idaho" },
    { value: "University of Illinois at Chicago", label: "University of Illinois at Chicago" },
    { value: "University of Illinois at Urbana-Champaign", label: "University of Illinois at Urbana-Champaign" },
    { value: "University of Iowa", label: "University of Iowa" },
    { value: "University of Kansas", label: "University of Kansas" },
    { value: "University of Kentucky", label: "University of Kentucky" },
    { value: "University of Louisville", label: "University of Louisville" },
    { value: "University of Maine", label: "University of Maine" },
    { value: "University of Maryland, Baltimore", label: "University of Maryland, Baltimore" },
    { value: "University of Maryland, Baltimore County", label: "University of Maryland, Baltimore County" },
    { value: "University of Maryland, College Park", label: "University of Maryland, College Park" },
    { value: "University of Massachusetts Amherst", label: "University of Massachusetts Amherst" },
    { value: "University of Massachusetts Boston", label: "University of Massachusetts Boston" },
    { value: "University of Massachusetts Lowell", label: "University of Massachusetts Lowell" },
    { value: "University of Memphis", label: "University of Memphis" },
    { value: "University of Miami", label: "University of Miami" },
    { value: "University of Michigan", label: "University of Michigan" },
    { value: "University of Minnesota", label: "University of Minnesota" },
    { value: "University of Mississippi", label: "University of Mississippi" },
    { value: "University of Missouri-Columbia", label: "University of Missouri-Columbia" },
    { value: "University of Missouri-Kansas City", label: "University of Missouri-Kansas City" },
    { value: "University of Missouri-St. Louis", label: "University of Missouri-St. Louis" },
    { value: "University of Montana", label: "University of Montana" },
    { value: "University of Nebraska-Lincoln", label: "University of Nebraska-Lincoln" },
    { value: "University of Nevada, Las Vegas", label: "University of Nevada, Las Vegas" },
    { value: "University of Nevada, Reno", label: "University of Nevada, Reno" },
    { value: "University of New Hampshire", label: "University of New Hampshire" },
    { value: "University of New Mexico", label: "University of New Mexico" },
    { value: "University of New Orleans", label: "University of New Orleans" },
    { value: "University of North Carolina at Chapel Hill", label: "University of North Carolina at Chapel Hill" },
    { value: "University of North Carolina at Charlotte", label: "University of North Carolina at Charlotte" },
    { value: "University of North Carolina at Greensboro", label: "University of North Carolina at Greensboro" },
    { value: "University of North Dakota", label: "University of North Dakota" },
    { value: "University of North Georgia", label: "University of North Georgia" },
    { value: "University of North Texas", label: "University of North Texas" },
    { value: "University of Notre Dame", label: "University of Notre Dame" },
    { value: "University of Oklahoma", label: "University of Oklahoma" },
    { value: "University of Oregon", label: "University of Oregon" },
    { value: "University of Pennsylvania", label: "University of Pennsylvania" },
    { value: "University of Pittsburgh", label: "University of Pittsburgh" },
    { value: "University of Rhode Island", label: "University of Rhode Island" },
    { value: "University of Rochester", label: "University of Rochester" },
    { value: "University of South Alabama", label: "University of South Alabama" },
    { value: "University of South Carolina", label: "University of South Carolina" },
    { value: "University of South Florida", label: "University of South Florida" },
    { value: "University of Southern California", label: "University of Southern California" },
    { value: "University of Southern Mississippi", label: "University of Southern Mississippi" },
    { value: "University of Stuttgart", label: "University of Stuttgart" },
    { value: "University of Tennessee, Knoxville", label: "University of Tennessee, Knoxville" },
    { value: "University of Texas MD Anderson Cancer Center", label: "University of Texas MD Anderson Cancer Center" },
    { value: "University of Texas at Arlington", label: "University of Texas at Arlington" },
    { value: "University of Texas at Austin", label: "University of Texas at Austin" },
    { value: "University of Texas at Dallas", label: "University of Texas at Dallas" },
    { value: "University of Texas at El Paso", label: "University of Texas at El Paso" },
    { value: "University of Texas at San Antonio", label: "University of Texas at San Antonio" },
    { value: "University of Toledo", label: "University of Toledo" },
    { value: "University of Toronto", label: "University of Toronto" },
    { value: "University of Utah", label: "University of Utah" },
    { value: "University of Vermont", label: "University of Vermont" },
    { value: "University of Virginia", label: "University of Virginia" },
    { value: "University of Washington", label: "University of Washington" },
    { value: "University of Waterloo", label: "University of Waterloo" },
    { value: "University of West Georgia", label: "University of West Georgia" },
    { value: "University of Wisconsin-Madison", label: "University of Wisconsin-Madison" },
    { value: "University of Wisconsin-Milwaukee", label: "University of Wisconsin-Milwaukee" },
    { value: "University of Wyoming", label: "University of Wyoming" },
    { value: "Utah State University", label: "Utah State University" },
    { value: "Valdosta State University", label: "Valdosta State University" },
    { value: "Valencia College", label: "Valencia College" },
    { value: "Vanderbilt University", label: "Vanderbilt University" },
    { value: "Virginia Commonwealth University", label: "Virginia Commonwealth University" },
    { value: "Virginia Polytechnic Institute and State University", label: "Virginia Polytechnic Institute and State University" },
    { value: "Wake Forest University", label: "Wake Forest University" },
    { value: "Washington State University", label: "Washington State University" },
    { value: "Washington University in St. Louis", label: "Washington University in St. Louis" },
    { value: "Wayne State University", label: "Wayne State University" },
    { value: "Wesleyan University", label: "Wesleyan University" },
    { value: "West Virginia University", label: "West Virginia University" },
    { value: "Western Illinois University", label: "Western Illinois University" },
    { value: "Wright State University", label: "Wright State University" },
    { value: "Yale University", label: "Yale University" },
    { value: "Yeshiva University", label: "Yeshiva University" },
];

export default Schools;