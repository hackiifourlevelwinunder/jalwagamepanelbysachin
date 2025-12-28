async function approve(){
  let uid = document.getElementById("uid").value;
  await fetch("/approve",{
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify({uid})
  });
  alert("Approved");
}