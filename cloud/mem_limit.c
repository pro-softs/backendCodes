#include <stdio.h>
#include <malloc.h>

#define MAX 100

int main()
{
	int T,N,M[MAX+1],i=0,j,alloc;
	scanf("%d",&T);
	while(i++<T)
	{
		scanf("%d",&N);
		j=0;
		while(j<N)
			scanf("%d",&M[j++]);
		j=1;
		alloc = M[0];
		while(j<N)
		{
			if(M[j]>M[j-1])
				alloc+=M[j]-M[j-1];
			++j;
		}
		printf("%d\n",alloc);


	}
}