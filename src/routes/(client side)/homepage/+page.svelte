<script>
    import {Timestamp} from 'firebase/firestore'
    import Announcement from './Announcement.svelte';
    const announcementSamples = [
        {
            title: "Announcement Title Sample",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dictum varius varius. Curabitur accumsan non justo vitae aliquet. Fusce sit amet nibh suscipit, dignissim libero a, hendrerit dui. Ut vel mattis odio. Nullam ornare, ligula id posuere mollis, ligula ipsum bibendum tellus a interdum tortor felis at tortor. Mauris id",
            dateAdded:  Timestamp.now().toDate(),
            postedBy: "admin1"
        },
        {
            title: "Breaking News!",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dictum varius varius. Curabitur accumsan non justo vitae aliquet. Fusce sit amet nibh suscipit, dignissim libero a, hendrerit dui. Ut vel mattis odio. Nullam ornare, ligula id posuere mollis, ligula ipsum bibendum tellus a interdum tortor felis at tortor. Mauris id",
            dateAdded:  Timestamp.now().toDate(),
            postedBy: "admin1"
        },
        {
            title: "Announcement Title Sample",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dictum varius varius. Curabitur accumsan non justo vitae aliquet. Fusce sit amet nibh suscipit, dignissim libero a, hendrerit dui. Ut vel mattis odio. Nullam ornare, ligula id posuere mollis, ligula ipsum bibendum tellus a interdum tortor felis at tortor. Mauris id",
            dateAdded:  Timestamp.now().toDate(),
            postedBy: "admin1"
        }
    ]
</script>

<svelte:head>
    <title>Homepage - Announcements | B.A.R.S.</title>
</svelte:head>

<section class=" lg:overflow-y-auto lg:max-h-[80vh] lg:w-[70%] flex flex-col gap-10 p-4">
    <Announcement {announcementSamples}/>
</section>

