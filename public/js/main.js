$(document).ready(function(){
	$('#delete').click(function(e){
		if (confirm('Are you sure you want to delete this thing from the database?')) {
			$target = $(e.target);
	        const id = $target.attr('data-id');
			$.ajax({
				type:'DELETE',
				url: '/lead/'+id,
				success: function(response){
					alert('Deleting this Lead');
					window.location.href='/';
				},
				error: function(err) {
					console.log(err);
				}
			});
		} else {
		    // Do nothing!
		}
	});
});