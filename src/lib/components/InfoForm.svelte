<script>
	import { validate_component } from "svelte/internal";

  // export let lastNameValid ;
  

</script>


<section class="flex flex-1 flex-col gap-2 h-max">
    <section class="flex justify-center">
        <span>Basic Information</span>
    </section>
    <div class="flex flex-row items-center justify-between gap-2">
        <div class="flex flex-col flex-1">
            <label for="lastName" class="label">
                <span class="label-text">Last Name</span>
              </label>
            <input required title="Please your Last Name" type="text" 
              id="lastName" name="lastName" placeholder="Type here" 
              class="input input-bordered input-md invalid:input-error input-secondary w-full max-w-xs bg-white focus:border-primary focus:outline-offset-[3px]"
              />
        </div>
        <div class="flex flex-col flex-1">
            <label for="firstName" class="label">
                <span class="label-text">First Name</span>
              </label>
            <input required type="text" id="firstName" name="firstName" placeholder="Type here" class="input input-bordered input-md input-secondary w-full max-w-xs bg-white focus:border-primary focus:outline-offset-[3px]" />
        </div>
        <div class="flex flex-col flex-1">
            <label for="middleName" class="label">
                <span class="label-text">Middle Name</span>
              </label>
            <input required type="text" id="lastName" name="middleName" placeholder="Type here" class="input input-bordered input-md input-secondary w-full max-w-xs bg-white focus:border-primary focus:outline-offset-[3px]" />
        </div>
    </div>
    <div class="flex flex-col flex-1">
        <label for="address" class="label">
            <span class="label-text">Complete Address</span>
          </label>
        <input required type="text" id="address" name="address" placeholder="Type here" class="input input-bordered input-md input-secondary w-full bg-white focus:border-primary focus:outline-offset-[3px]" />
    </div>
    <div class="group flex flex-col flex-1 ">
        <label for="email" class="label">
            <span class="label-text">Email Address</span>
          </label>
        <input required type="email" id="email" name="email" placeholder="example@email.com" class="input input-bordered input-md invalid:input-error input-secondary w-full bg-white focus:border-primary focus:outline-offset-[3px]"/>
    </div>
    <section class="flex flex-row gap-2">
        <div class="flex flex-col flex-1 ">
            <label for="birthDate" class="label">
                <span class="label-text">Birthdate</span>
              </label>
            <input required type="date" id="birthdate" name="birthdate" placeholder="Type here" class="input input-bordered input-md input-secondary w-full bg-white focus:border-primary focus:outline-offset-[3px]" />
        </div>
        <div class="flex flex-col flex-1 ">
            <label for="age" class="label">
                <span class="label-text">Age</span>
                <span class="label-text-alt">years old</span>
              </label>
            <input required type="number" id="age" name="age" placeholder="Type here" class="input input-bordered input-md input-secondary w-full bg-white focus:border-primary focus:outline-offset-[3px]" />
        </div>
    </section>
    <div class="flex flex-col flex-1 ">
        <label for="contact" class="label">
            <span class="label-text">Phone Number</span>
          </label>
        <input required type="tel" id="contact" name="contact" placeholder="09** *** *** / 639** *** ****" class="input input-bordered input-md input-secondary w-full bg-white focus:border-primary focus:outline-offset-[3px]" />
    </div>
    <div class="flex flex-col flex-1 ">
        <label for="purpose" class="label">
            <span class="label-text">Purpose of the Request</span>
          </label>
        <input required type="text" id="purpose" name="purpose" placeholder="Type here" class="input input-bordered input-md input-secondary w-full bg-white focus:border-primary focus:outline-offset-[3px]"/>
    </div>
    
</section>

