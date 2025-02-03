import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Post } from '@/types/schedule';
import { toast } from 'sonner';

interface ScheduledPost extends Post {
  id: string;
}

export const useScheduledPosts = () => {
  const queryClient = useQueryClient();

  const { data: posts, isLoading } = useQuery({
    queryKey: ['scheduledPosts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('scheduled_posts')
        .select('*')
        .order('scheduled_date', { ascending: true });

      if (error) {
        toast.error('Erreur lors du chargement des posts');
        throw error;
      }

      return data as ScheduledPost[];
    },
  });

  const addScheduledPosts = useMutation({
    mutationFn: async (posts: { post: Post; scheduledDate: Date }[]) => {
      const { data, error } = await supabase
        .from('scheduled_posts')
        .insert(
          posts.map(({ post, scheduledDate }) => ({
            content: post.content,
            image_info: post.image_info,
            video_info: post.video_info,
            scheduled_date: scheduledDate.toISOString(),
            user_id: post.user_id,
          }))
        )
        .select();

      if (error) {
        toast.error('Erreur lors de la programmation des posts');
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scheduledPosts'] });
      toast.success('Posts programmés avec succès');
    },
  });

  return {
    posts,
    isLoading,
    addScheduledPosts,
  };
};