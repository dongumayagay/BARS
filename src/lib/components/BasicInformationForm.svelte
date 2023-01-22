<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher()

    const today = new Date();
    let dateFormat = today.getDate()
    let monthFormat = (today.getMonth() + 1);

    // the date's number should start with "0" if its value is less than 10 for it to be valid, otherwise the min value will be ignored
    if(dateFormat < 10){
        dateFormat = "0" + dateFormat;
    }

    // the month's number should start with "0" if its value is less than 10 for it to be valid, otherwise the min value will be ignored
    if(monthFormat < 10){
        monthFormat = "0" + monthFormat;
    }
    
    let todayFormat = today.getFullYear() + "-" + monthFormat + "-" + dateFormat;
    
    let contactInfo = {
        lastName: "",
        firstName: "",
        middleName: "",
        address: "",
        birthdate: "",
        email: "",
        contactNo: "",
        purpose: "",
    }
    
    function submitHandler() {
        dispatch("next", {
            contactInfo
        })
    }

//  $: console.log(JSON.stringify(contactInfo))
</script>

<svelte:head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" 
			integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" 
			crossorigin="anonymous" referrerpolicy="no-referrer" />
</svelte:head>


<form class="flex flex-1 flex-col gap-5 h-max " on:submit|preventDefault={submitHandler} on:reset={(event)=>event.target.reset()}>
    <section>
        <h1 class="font-bold text-center">Basic Information</h1>
    </section>
    <section class="flex flex-col gap-4">

        <div class="flex flex-col flex-1">
            <label for="lastName" class="label">
                <span class="label-text">Last Name</span>
                </label>
            <input required title="Please enter your last name" type="text" 
                placeholder="ex: Dela Cruz"
                class="input input-bordered input-md input-primary w-full bg-neutral focus:border-primary focus:outline-offset-[3px]"
                bind:value={contactInfo.lastName}
                />
        </div>
        <div class="flex flex-col flex-1">
            <label for="firstName" class="label">
                <span class="label-text">First Name</span>
                </label>
            <input required title="Please enter your first name" type="text" id="firstName" name="firstName" placeholder="ex: Juan" class="input input-bordered input-md input-primary w-full bg-neutral focus:border-primary focus:outline-offset-[3px]"
            bind:value={contactInfo.firstName}
             />
        </div>
        <div class="flex flex-col flex-1">
            <label for="middleName" class="label">
                <span class="label-text">Middle Name</span>
            </label>
            <input  type="text" title="Disregard if not applicable" id="middleName" name="middleName" placeholder="(optional)" class="input input-bordered input-md input-primary w-full bg-neutral focus:border-primary focus:outline-offset-[3px]"
            bind:value={contactInfo.middleName}
             />
        </div>
        <div class="flex flex-col flex-1">
            <label for="address" class="label">
                <span class="label-text">Complete Address</span>
              </label>
            <!-- <input required title="Please enter your complete address" type="text" id="address" name="address" placeholder="Brgy. United Bayanihan, San Pedro, Laguna" class="input input-bordered input-md input-primary "
            
             /> -->
            <textarea required title="Please enter your complete address" class="textarea textarea-primary w-full bg-neutral focus:border-primary focus:outline-offset-[3px]" placeholder="Lot **, Blk **, Brgy. United Bayanihan, San Pedro City, Laguna" bind:value={contactInfo.address}></textarea>
        </div>
        <div class="group flex flex-col flex-1 ">
            <label for="email" class="label">
                <span class="label-text">Email Address</span>
              </label>
            <input required title="Please enter your valid Email address" type="email" id="email" name="email" placeholder="example@email.com" class="input input-bordered input-md input-primary w-full bg-neutral focus:border-primary focus:outline-offset-[3px]"
            bind:value={contactInfo.email}
             />
        </div>
        <section class="flex flex-row gap-2">
            <div class="flex flex-col flex-1 ">
                <label for="birthDate" class="label">
                    <span class="label-text">Birthdate</span>
                  </label>
                <input required title="Please enter your last name" type="date" id="birthdate" name="birthdate" placeholder="Type here" min="1890-01-01" max={todayFormat} class="input input-bordered input-md input-primary w-full bg-neutral focus:border-primary focus:outline-offset-[3px]"
                bind:value={contactInfo.birthdate}
                />
            </div>
        </section>
        <div class="flex flex-col flex-1 ">
            <label for="contact" class="label">
                <span class="label-text">Phone Number</span>
              </label>
            <input required title="Please enter your valid phone number" type="tel" id="contact" name="contact" placeholder="09** *** *** / 639** *** ****" class="input input-bordered input-md input-primary w-full bg-neutral focus:border-primary focus:outline-offset-[3px]"
            bind:value={contactInfo.contactNo}
              />
        </div>
        <div class="flex flex-col flex-1 ">
            <label for="purpose" class="label">
                <span class="label-text">Purpose of the Request</span>
              </label>
            <!-- <input required title="Please enter the purpose of the requirement" type="textarea" id="purpose" name="purpose" placeholder="example: Job Requirement" class="input input-bordered input-md input-primary "
            
            /> -->
            <textarea class="textarea textarea-primary w-full bg-neutral focus:border-primary focus:outline-offset-[3px]" placeholder="example: Job Requirement" bind:value={contactInfo.purpose}></textarea>
        </div>
    </section>
    
    <section class="flex gap-4">
        <button type="submit" class="btn btn-primary flex gap-2">
            <p>Next</p> 
            <i class="fa-solid fa-arrow-right"></i>
        </button>
        <button type="reset">Clear Form</button>
    </section>
</form>
