<script>
	import { addDoc, doc, getDoc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
    // import { auth } from "$lib"
    import { createEventDispatcher, onMount } from "svelte";
    import { reauthenticateWithCredential } from "firebase/auth";
    import { userStore } from "$lib/stores.js"
    import { db, auth } from "$lib/firebase/client.js"
	import BasicInfoEditor from "../../../lib/components/account-settings-components/BasicInfoEditor.svelte";

    export let otherModalOpened;

    const dispatch = createEventDispatcher();

    let adminBasicInfo = {};
    let userExists;
    
    onMount(async ()=>{
        const userBasicInfo = await getDoc(doc(db, "users",$userStore.uid))
        if(userBasicInfo.exists()){
            userExists = true
            adminBasicInfo = {...userBasicInfo.data()}
        }
        if(!userBasicInfo.exists()){
            userExists = false;
            adminBasicInfo = {
                firstName: "",
                lasName: "",
                middleName: "",
                suffix: "",
                address: "",
                birthdate: "",
                contctNo: "",
                nationality: "",
                civilStatus: "",
            }
        }
    })

    let enableEdit = false;
    let showLoadingScreen = false;
    let loadingStatement = "";

    function updateHandler(event){
        console.log(event.detail)
        showLoadingScreen = true;
        const currentUser = auth.currentUser;
        loadingStatement = "Re-authenticating user..."
        reauthenticateWithCredential(currentUser, event.detail.credential)
        .then(async ()=>{
            // alert("Re-authentication Success!")
            loadingStatement = "Updating your basic information..."
            if(!userExists){
                const addUserRef = await setDoc(doc(db, "users", $userStore.uid),{
                    ...event.detail.userBasicInfo
                })
                loadingStatement = "Refreshing webpage...";
                window.location.reload();
            } else {
                updateDoc(doc(db, "users", $userStore.uid),{
                    ...event.detail.userBasicInfo
                })
                .then(()=>{
                    loadingStatement = "Refreshing webpage...";
                    window.location.reload();
                })
            }
        }).catch((error)=>{
            // alert(error.message)
            switch(error.message){
                case "Firebase: Error (auth/wrong-password).":
                    alert("Wrong password, try again");
                    break;
                default:
                    alert(error.message);
                    break;
            }
            showLoadingScreen = false;
        })
    }

</script>

{#if !enableEdit}
<section class="w-[80%] lg:w-1/2 h-max flex flex-col gap-4 bg-neutral p-4 rounded-xl shadow-xl" class:hidden={otherModalOpened}>
    <div class="w-full flex justify-between items-center border-b-[1px] border-base-300 ">
        <p class="font-semibold p-2">Basic Information</p>
        <button class="btn btn-ghost btn-sm gap-1 group hover:bg-transparent" on:click={()=>{enableEdit=true; dispatch("open")}}>
            <p class="group-hover:underline">Edit</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
        </button>
    </div>
    <div class="flex flex-col lg:flex-row justify-center border-b-2 border-transparent hover:border-inherit group p-2">
        <p class="w-full lg:w-1/3 text-start font-semibold">First Name: </p>
        <p class="w-full text-center lg:text-start p-4 lg:p-0 {!!adminBasicInfo.firstName ? "" : "opacity-70"}">{!!adminBasicInfo.firstName || adminBasicInfo.firstName !== "" ? adminBasicInfo.firstName : "Click EDIT to add your First Name"}</p>
    </div>
    <div class="flex flex-col lg:flex-row justify-center border-b-2 border-transparent hover:border-inherit group p-2">
        <p class="w-full lg:w-1/3 text-start font-semibold">Middle Initial/Name: </p>
        <p class="w-full text-center lg:text-start p-4 lg:p-0 {!!adminBasicInfo.middleName ? "" : "opacity-70"}">{!!adminBasicInfo.middleName || adminBasicInfo.middleName !== "" ? adminBasicInfo.middleName : "Click EDIT to add your Middle Name"}</p>
    </div>
    <div class="flex flex-col lg:flex-row justify-center border-b-2 border-transparent hover:border-inherit group p-2">
        <p class="w-full lg:w-1/3 text-start font-semibold">Last Name: </p>
        <p class="w-full text-center lg:text-start p-4 lg:p-0 {!!adminBasicInfo.lastName ? "" : "opacity-70"}">{adminBasicInfo.lastName !== undefined || adminBasicInfo.lastName !== "" ? adminBasicInfo.lastName : "Click EDIT to add your Last Name"}</p>
    </div>
    <div class="flex flex-col lg:flex-row justify-center border-b-2 border-transparent hover:border-inherit group p-2">
        <p class="w-full lg:w-1/3 text-start font-semibold">Suffix/es: </p>
        <p class="w-full text-center lg:text-start p-4 lg:p-0 {!!adminBasicInfo.suffix ? "" : "opacity-70"}">{!!adminBasicInfo.suffix || adminBasicInfo.suffix !== "" ? adminBasicInfo.suffix : "Click EDIT to add your suffix"}</p>
    </div>
    <div class="flex flex-col lg:flex-row justify-center border-b-2 border-transparent hover:border-inherit group p-2">
        <p class="w-full lg:w-1/3 text-start font-semibold">Complete Addrsss: </p>
        <p class="w-full text-center lg:text-start p-4 lg:p-0 {!!adminBasicInfo.address ? "" : "opacity-70"}">{!!adminBasicInfo.address || adminBasicInfo.address !== "" ? adminBasicInfo.address : "Click EDIT to add your complete address"}</p>
    </div>
    <div class="flex flex-col lg:flex-row justify-center border-b-2 border-transparent hover:border-inherit group p-2">
        <p class="w-full lg:w-1/3 text-start font-semibold">Birthdate: </p>
        <p class="w-full text-center lg:text-start p-4 lg:p-0 {!!adminBasicInfo.birthdate ? "" : "opacity-70"}">{!!adminBasicInfo.birthdate || adminBasicInfo.birthdate !== "" ? adminBasicInfo.birthdate : "Click EDIT to add your birthdate"}</p>
    </div>
    <div class="flex flex-col lg:flex-row justify-center border-b-2 border-transparent hover:border-inherit group p-2">
        <p class="w-full lg:w-1/3 text-start font-semibold">Civil Status: </p>
        <p class="w-full text-center lg:text-start p-4 lg:p-0 {!!adminBasicInfo.civilStatus ? "" : "opacity-70"}">{!!adminBasicInfo.civilStatus || adminBasicInfo.civilStatus !== "" ? adminBasicInfo.civilStatus : "Click EDIT to add your Civil Status"}</p>
    </div>
    <div class="flex flex-col lg:flex-row justify-center border-b-2 border-transparent hover:border-inherit group p-2">
        <p class="w-full lg:w-1/3 text-start font-semibold">Nationality: </p>
    </div>
    <div>
        <p class="w-full text-center lg:text-start p-4 lg:p-0 {!!adminBasicInfo.nationality ? "" : "opacity-70"}">{!!adminBasicInfo.nationality || adminBasicInfo.nationality  !== "" ? adminBasicInfo.nationality : "Click EDIT to add your Nationality"}</p>
    </div>
    <div class="flex flex-col lg:flex-row justify-center border-b-2 border-transparent hover:border-inherit group p-2">
        <p class="w-full lg:w-1/3 text-start font-semibold">Phone Number: </p>
        <p class="w-full text-center lg:text-start p-4 lg:p-0 {!!adminBasicInfo.contactNo ? "" : "opacity-70"}">{!!adminBasicInfo.contactNo || adminBasicInfo.contactNo !== "" ? adminBasicInfo.contactNo : "Click EDIT to add your Phone Number"}</p>
    </div>
</section>
{:else}
    <BasicInfoEditor {showLoadingScreen} {loadingStatement} userBasicInfo={adminBasicInfo} on:update={updateHandler} on:close={()=>{enableEdit=false; dispatch("close")}}/>
{/if}
